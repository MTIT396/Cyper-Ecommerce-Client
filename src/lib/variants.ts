import { Variants } from 'framer-motion'

// ===== Left In Variants - smooth slide from left =====

export const LeftInVariants: Variants = {
   hidden: {
      opacity: 0,
      x: -40
   },
   show: {
      opacity: 1,
      x: 0,
      transition: {
         duration: 0.6,
         ease: [0.34, 1.56, 0.64, 1]
      }
   },
   exit: {
      opacity: 0,
      x: -20,
      transition: {
         duration: 0.3,
         ease: [0.4, 0, 1, 1]
      }
   }
}

// ===== Right In Variants - smooth slide from right =====

export const RightInVariants: Variants = {
   hidden: {
      opacity: 0,
      x: 40
   },
   show: {
      opacity: 1,
      x: 0,
      transition: {
         duration: 0.6,
         ease: [0.34, 1.56, 0.64, 1]
      }
   },
   exit: {
      opacity: 0,
      x: 20,
      transition: {
         duration: 0.3,
         ease: [0.4, 0, 1, 1]
      }
   }
}

// ===== Scale In Variants - elegant zoom entrance =====

export const ScaleInVariants: Variants = {
   hidden: {
      opacity: 0,
      scale: 0.92
   },
   show: {
      opacity: 1,
      scale: 1,
      transition: {
         duration: 0.5,
         ease: [0.34, 1.56, 0.64, 1]
      }
   },
   exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
         duration: 0.3,
         ease: [0.4, 0, 1, 1]
      }
   }
}

export const containerVariants: Variants = {
   hidden: {},
   show: {
      transition: {
         staggerChildren: 0.5
      }
   }
}

export const fastContainerVariants: Variants = {
   hidden: {},
   show: {
      transition: {
         staggerChildren: 0.06
      }
   }
}

export const slowContainerVariants: Variants = {
   hidden: {},
   show: {
      transition: {
         staggerChildren: 0.2
      }
   }
}

export const FadeUpVariants: Variants = {
   hidden: {
      opacity: 0,
      y: 20
   },
   show: {
      opacity: 1,
      y: 0,
      transition: {
         duration: 0.5,
         ease: [0.25, 0.8, 0.25, 1]
      }
   }
}
