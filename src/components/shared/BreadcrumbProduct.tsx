import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator
} from '../ui/breadcrumb'

type BreadcrumbProductType = {
   items: {
      label: string
      href?: string
   }[]
}

export function BreadcrumbProduct({ items }: BreadcrumbProductType) {
   return (
      <Breadcrumb>
         <BreadcrumbList>
            {items.length > 0 &&
               items.map((item, index) => {
                  const isLast = index === items.length - 1
                  return (
                     <div key={index} className='flex items-center gap-2'>
                        <BreadcrumbItem>
                           {isLast || !item.href ? (
                              <BreadcrumbPage>{item.label}</BreadcrumbPage>
                           ) : (
                              <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                           )}
                        </BreadcrumbItem>

                        {!isLast && <BreadcrumbSeparator />}
                     </div>
                  )
               })}
         </BreadcrumbList>
      </Breadcrumb>
   )
}
