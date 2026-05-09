import { cn } from '@/lib/utils'

type InfoRowProps = {
   className?: string
   label: string
   content: React.ReactNode
}

const InfoRow = ({ className, label, content }: InfoRowProps) => {
   return (
      <div className={cn('text-dark-gray flex justify-between text-sm', className)}>
         <span>{label}</span>
         <span>{content}</span>
      </div>
   )
}

export default InfoRow
