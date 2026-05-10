'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'

export const useQueryString = <T extends Record<string, string>>() => {
   const searchParams = useSearchParams()

   return useMemo(() => Object.fromEntries(searchParams.entries()) as T, [searchParams])
}
