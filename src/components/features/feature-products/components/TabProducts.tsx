'use client'

import Container from '@/components/Container'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import clsx from 'clsx'
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
   const [style, setStyle] = useState({ left: 0, width: 0 })

   const ref = useRef<HTMLDivElement>(null)

   useEffect(() => {
      const el = ref.current?.querySelector(`[data-value="${activeTab}"]`) as HTMLElement

      if (el) {
         setStyle({
            left: el.offsetLeft,
            width: el.offsetWidth
         })
      }
   }, [activeTab])

   return (
      <Container className='py-16'>
         <Tabs
            defaultValue='newest'
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as TabValue)}
         >
            {/* Custom Tabs */}
            <TabsList
               ref={ref}
               className='relative mb-4 flex gap-6 border-b border-none bg-transparent p-0'
            >
               {tabs.map((tab) => (
                  <TabsTrigger
                     key={tab.value}
                     value={tab.value}
                     data-value={tab.value}
                     className={clsx(
                        'rounded-none border-none bg-transparent px-0 pb-2 text-base font-medium shadow-none',
                        'data-[state=active]:bg-transparent data-[state=active]:shadow-none',
                        activeTab === tab.value
                           ? 'text-primary'
                           : 'hover:text-primary text-extra-gray'
                     )}
                  >
                     {tab.label}
                  </TabsTrigger>
               ))}

               {/* underline */}
               <span
                  className='bg-primary absolute bottom-0 h-[2px] transition-all duration-300'
                  style={style}
               />
            </TabsList>

            {/* Content */}
            <TabsContent value='bestseller'>
               <ProductList type='bestseller' />
            </TabsContent>

            <TabsContent value='newest'>
               <ProductList type='newest' />
            </TabsContent>

            <TabsContent value='featured'>
               <ProductList type='featured' />
            </TabsContent>
         </Tabs>
      </Container>
   )
}
