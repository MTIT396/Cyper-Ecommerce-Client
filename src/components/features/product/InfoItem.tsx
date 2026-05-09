import { LucideProps } from 'lucide-react'

const InfoItem = ({
   icon: Icon,
   title,
   desc
}: {
   icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
   >
   title: string
   desc: string
}) => (
   <div className='flex w-full items-center gap-3'>
      <div className='bg-light-gray rounded-md border p-2.5'>
         <Icon size={20} />
      </div>
      <div className='space-y-1 text-sm'>
         <p className='text-extra-gray'>{title}</p>
         <b>{desc}</b>
      </div>
   </div>
)

export default InfoItem
