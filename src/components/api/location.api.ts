import { OptionType } from '@/types/filter.type'
import { Provinces, Wards } from '@/types/location.type'

const PROVINCES_BASE_API = 'https://provinces.open-api.vn/api/v2'

export const fetchProvinces = async (): Promise<OptionType[]> => {
   const res = await fetch(`${PROVINCES_BASE_API}/p/`)
   const data: Provinces[] = await res.json()

   return data.map((province) => ({
      label: province.name.replace(/^(Tỉnh|Thành phố)\s+/, ''), // clean up prefix
      value: province.code.toString()
   }))
}

export const fetchWards = async (provinceCode: string): Promise<OptionType[]> => {
   const res = await fetch(`${PROVINCES_BASE_API}/p/${provinceCode}?depth=2`)
   const data: Wards = await res.json()

   return data.wards.map((ward) => ({
      label: ward.name,
      value: ward.name
   }))
}
