'use client'

import Container from '@/components/Container'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import ProductList from './ProductsList'

const tabs = [
   { label: 'Hàng mới về', value: 'newest' },
   { label: 'Bán chạy', value: 'bestseller' },
   { label: 'Nổi bật', value: 'featured' }
] as const

type TabValue = (typeof tabs)[number]['value']

export default function TabProducts() {
   const [activeTab, setActiveTab] = useState<TabValue>('newest')

   const [style, setStyle] = useState({
      left: 0,
      width: 0
   })

   const ref = useRef<HTMLDivElement>(null)

   useEffect(() => {
      const el = ref.current?.querySelector(`[data-value="${activeTab}"]`) as HTMLElement

      if (!el) return

      setStyle({
         left: el.offsetLeft,
         width: el.offsetWidth
      })
   }, [activeTab])

   return (
      <Container className='py-16'>
         <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabValue)}>
            {/* Tabs */}
            <TabsList ref={ref} className='relative mb-2 flex gap-6 border-none bg-transparent p-0'>
               {tabs.map((tab) => (
                  <TabsTrigger
                     key={tab.value}
                     value={tab.value}
                     data-value={tab.value}
                     className={clsx(
                        'relative rounded-none border-none bg-transparent px-0 pb-3 text-base font-medium shadow-none transition-colors duration-300',
                        'data-[state=active]:bg-transparent data-[state=active]:shadow-none',
                        activeTab === tab.value
                           ? 'text-primary'
                           : 'text-extra-gray hover:text-primary'
                     )}
                  >
                     {tab.label}
                  </TabsTrigger>
               ))}

               {/* Animated underline */}
               <motion.span
                  animate={{
                     left: style.left,
                     width: style.width
                  }}
                  transition={{
                     type: 'spring',
                     stiffness: 380,
                     damping: 30
                  }}
                  className='bg-primary absolute bottom-0 h-[2px]'
               />
            </TabsList>

            {/* Animated Content */}
            <div className='relative overflow-hidden'>
               <AnimatePresence mode='wait'>
                  <motion.div
                     key={activeTab}
                     initial={{
                        opacity: 0,
                        y: 24
                     }}
                     animate={{
                        opacity: 1,
                        y: 0
                     }}
                     exit={{
                        opacity: 0,
                        y: -12
                     }}
                     transition={{
                        duration: 0.35,
                        ease: 'easeOut'
                     }}
                  >
                     <TabsContent
                        value='newest'
                        forceMount
                        className={activeTab === 'newest' ? 'block' : 'hidden'}
                     >
                        <ProductList type='newest' />
                     </TabsContent>

                     <TabsContent
                        value='bestseller'
                        forceMount
                        className={activeTab === 'bestseller' ? 'block' : 'hidden'}
                     >
                        <ProductList type='bestseller' />
                     </TabsContent>

                     <TabsContent
                        value='featured'
                        forceMount
                        className={activeTab === 'featured' ? 'block' : 'hidden'}
                     >
                        <ProductList type='featured' />
                     </TabsContent>
                  </motion.div>
               </AnimatePresence>
            </div>
         </Tabs>
      </Container>
   )
}
