import { ParamKey } from '@/types/filter.type'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const useUpdateURL = () => {
   const searchParams = useSearchParams()
   const pathname = usePathname()
   const router = useRouter()

   const updateURL = (key: ParamKey, value?: string | string[], isRemove = false) => {
      const params = new URLSearchParams(searchParams.toString())
      const currentValue = params.get(key)

      // isRemove logic
      if (isRemove) {
         if (!currentValue || value === undefined) {
            params.delete(key)
         } else {
            const currentValues = currentValue.split(',')

            const removeValues = Array.isArray(value) ? value : [value]

            const nextValues = currentValues.filter((v) => !removeValues.includes(v))

            if (nextValues.length === 0) {
               params.delete(key)
            } else {
               params.set(key, nextValues.join(','))
            }
         }
      }

      // add/update logic
      else {
         if (value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
            params.delete(key)
         } else if (Array.isArray(value)) {
            params.set(key, value.join(','))
         } else {
            params.set(key, value)
         }
      }

      router.push(`${pathname}?${params.toString()}`, {
         scroll: false
      })
   }

   return { updateURL }
}
