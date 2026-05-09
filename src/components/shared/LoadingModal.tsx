import { AnimatePresence, motion } from 'framer-motion'
import Loading from './Loading'

type LoadingModalProps = {
   isOpen: boolean
   title?: string
   description?: string
}

export default function LoadingModal({ isOpen }: LoadingModalProps) {
   return (
      <AnimatePresence>
         {isOpen && (
            <div className='fixed inset-0 z-[9999] mb-0 flex items-center justify-center'>
               {/* Backdrop */}
               <motion.div
                  className='absolute inset-0 z-0 bg-white/20'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
               />

               {/* Modal */}
               <motion.div
                  className='relative z-10'
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
               >
                  <Loading />
               </motion.div>
            </div>
         )}
      </AnimatePresence>
   )
}
