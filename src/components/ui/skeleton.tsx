import { cn } from '@/lib/utils'
import { cx } from 'class-variance-authority'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
   return (
      <div
         data-slot='skeleton'
         className={cn('bg-accent animate-pulse rounded-md', className)}
         {...props}
      />
   )
}

export { Skeleton }

type WithChildren = { children?: React.ReactNode; className?: string; onClick?: () => void }

/* ---------------- Body ---------------- */
export const Body = ({ children, className }: WithChildren) => (
   <div className={cx('flex !h-full items-start gap-x-4', className)}>{children}</div>
)

export const Footer = ({ children, className }: WithChildren) => (
   <div className={cx('flex items-center', className)}>{children}</div>
)
export const Content = ({ children, className }: WithChildren) => (
   <div className={cx('flex h-full flex-1 flex-col space-y-3', className)}>{children}</div>
)

// Block

export const TitleBlock = ({ children, className }: WithChildren) => (
   <h2 className={cx('flex items-stretch justify-between space-y-2 gap-x-1', className)}>
      {children}
   </h2>
)

export const TitleContent = ({ children, className }: WithChildren) => (
   <div className={cx('flex-1 space-y-3', className)}>{children}</div>
)
