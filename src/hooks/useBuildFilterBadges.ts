import { BadgeFilter, URLParams } from '@/types/filter.type'
import { useFilterProducts } from './useFilterProducts'
import { sortOptions } from '@/constants/options.constant'

export const useBuildFilterBadges = (params: URLParams, categoryId?: number): BadgeFilter[] => {
   const badges: BadgeFilter[] = []

   const { filters } = useFilterProducts(categoryId)

   if (params.price && filters) {
      const priceBadge = filters.price.find((p) => p.value === params.price)
      if (priceBadge) {
         badges.push({ key: 'price', ...priceBadge })
      }
   }

   if (params.rating && filters) {
      const ratingValues = params.rating.split(',')
      ratingValues.forEach((rating) => {
         const ratingBadge = filters.rating.find((r) => r.value.toString() === rating)
         if (ratingBadge) {
            badges.push({ key: 'rating', ...ratingBadge })
         }
      })
   }

   if (params.brands && filters) {
      const brandsValues = params.brands.split(',')
      brandsValues.forEach((rating) => {
         const brandsBadge = filters.brands.find((r) => r.value.toString() === rating)
         if (brandsBadge) {
            badges.push({ key: 'brands', ...brandsBadge })
         }
      })
   }

   if (params.colors && filters) {
      const colorValues = params.colors.split(',')
      colorValues.forEach((color) => {
         const colorsBadge = filters.colors.find((r) => r.value.toString() === color)
         if (colorsBadge) {
            badges.push({ key: 'colors', ...colorsBadge })
         }
      })
   }

   if (params.sort && filters) {
      const sortBadge = sortOptions.find((s) => s.value === params.sort)
      if (sortBadge) {
         badges.push({ key: 'sort', ...sortBadge })
      }
   }

   if (params.specs && filters) {
      const specsPairs = params.specs.split(',')

      specsPairs.forEach((pair) => {
         const [specKey, specValue] = pair.split(':')

         const specGroup = filters.specs.find((s) => s.slug === specKey)

         if (!specGroup) return

         const matchValue = specGroup.values.find((v) => v.value === specValue)

         if (!matchValue) return

         badges.push({
            key: 'specs',
            label: ` ${matchValue.label}`,
            value: `${specKey}:${specValue}`
         })
      })
   }

   return badges
}
