import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavItem({
   className,
   href,
   label
}: {
   className?: string
   href: string
   label: string
}) {
   const pathname = usePathname()
   const isActive = pathname === href
   const isSale = href === '/sale'

   return (
      <Link
         href={href}
         className={cn(
            'group relative w-fit text-left text-sm leading-7 font-medium text-nowrap transition',
            isSale && 'text-red-600',
            className
         )}
      >
         {label}

         <span
            className={cn(
               'absolute bottom-0 h-px transition-all duration-300',
               'group-hover:left-0 group-hover:w-full',
               isActive ? 'left-0 w-full' : 'left-1/2 w-0',
               isSale ? 'bg-red-600' : 'bg-black'
            )}
         />
      </Link>
   )
}
