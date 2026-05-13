import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const formatDateTime = (date: string) => {
   const d = new Date(date)

   const datePart = d.toLocaleDateString('vi-VN')
   const timePart = d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
   })

   return `${datePart}, ${timePart}`
}

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs))
}

export function convertVNDtoUSD(VND: number, exchangeRate = 25000) {
   if (typeof VND !== 'number' || VND < 0) {
      throw new Error('Số tiền VND phải là số dương')
   }

   if (typeof exchangeRate !== 'number' || exchangeRate <= 0) {
      throw new Error('Tỷ giá phải là số dương')
   }

   return parseFloat((VND / exchangeRate).toString()).toFixed(2)
}

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const vnCurrencyFormatter = new Intl.NumberFormat('vi-VN', {
   style: 'currency',
   currency: 'VND',
   maximumFractionDigits: 0
})

export const formatVNCurrency = (amount?: number | null, fallback = '0 ₫'): string => {
   if (amount == null || isNaN(amount)) return fallback

   if (amount < 0) return `-${vnCurrencyFormatter.format(Math.abs(amount))}`

   return vnCurrencyFormatter.format(amount)
}
