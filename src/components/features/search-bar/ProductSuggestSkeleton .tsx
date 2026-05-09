export default function ProductSuggestSkeleton() {
   return (
      <div className='flex animate-pulse gap-3'>
         <div className='h-14 w-14 rounded-md bg-gray-200' />

         <div className='flex-1 space-y-2'>
            <div className='h-4 w-4/5 rounded bg-gray-200' />
            <div className='h-4 w-1/2 rounded bg-gray-200' />
         </div>
      </div>
   )
}
