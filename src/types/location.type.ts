/** Locations Type */
export type Provinces = {
   name: string
   code: number
   division_type: string
   codename: string
   phone_code: number
   wards: []
}

export type Wards = {
   name: string
   code: number
   division_type: string
   codename: string
   wards: Array<{
      name: string
      code: number
      division_type: string
      codename: string
      province_code: number
   }>
}
