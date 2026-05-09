'use client'

import { motion, Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type FadeMotionItemProps = {
   variants: Variants
   children: ReactNode
   className?: string
   delay?: number
   duration?: number
   whileHover?: boolean
   whileTap?: boolean
}

export function FadeMotionItem({
   children,
   className,
   variants,
   delay = 0,
   whileHover = false,
   whileTap = false
}: FadeMotionItemProps) {
   return (
      <motion.div
         variants={variants}
         initial='hidden'
         animate='show'
         exit='exit'
         transition={{ delay }}
         whileHover={
            whileHover
               ? {
                    scale: 1.02,
                    transition: { duration: 0.2 }
                 }
               : undefined
         }
         whileTap={
            whileTap
               ? {
                    scale: 0.98,
                    transition: { duration: 0.1 }
                 }
               : undefined
         }
         className={className}
      >
         {children}
      </motion.div>
   )
}
