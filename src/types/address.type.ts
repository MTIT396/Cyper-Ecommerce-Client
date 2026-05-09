export interface AddressRequest {
   full_name: string
   phone: string
   email?: string
   province: string
   ward: string
   street: string
   is_default: boolean
}

export interface AddressResponse extends AddressRequest {
   id: number
}
