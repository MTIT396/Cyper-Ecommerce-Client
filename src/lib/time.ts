export const formattedDate = (date: Date) =>
   date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
   })

export const addDays = (days: number): Date => {
   const date = new Date()
   date.setDate(date.getDate() + days)
   return date
}
