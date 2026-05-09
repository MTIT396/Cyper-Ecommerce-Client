'use client'

import { containerVariants, fastContainerVariants, slowContainerVariants } from '@/lib/variants'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import type { ReactNode } from 'react'

export type ContainerMode = 'normal' | 'fast' | 'slow'

type FadeMotionWrapperProps = {
   children: ReactNode
   className?: string
   mode?: ContainerMode
   customVariants?: Variants
   exitBeforeEnter?: boolean
   motionKey?: string
}

const modeVariantsMap: Record<ContainerMode, Variants> = {
   normal: containerVariants,
   fast: fastContainerVariants,
   slow: slowContainerVariants
}

export function FadeMotionWrapper({
   children,
   className,
   mode = 'normal',
   customVariants,
   exitBeforeEnter = true,
   motionKey
}: FadeMotionWrapperProps) {
   const variants = customVariants || modeVariantsMap[mode]

   return (
      <AnimatePresence mode={exitBeforeEnter ? 'wait' : 'sync'}>
         <motion.div
            key={motionKey}
            variants={variants}
            initial='hidden'
            animate='show'
            exit='hidden'
            className={className}
         >
            {children}
         </motion.div>
      </AnimatePresence>
   )
}
