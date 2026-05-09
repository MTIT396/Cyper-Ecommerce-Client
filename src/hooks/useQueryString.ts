import { useSearchParams } from 'next/navigation'

export const useQueryString = () => {
   const searchParams = useSearchParams()

   // convert searchParams to object
   const searchParamsObject = Object.fromEntries(searchParams.entries())

   return searchParamsObject
}
