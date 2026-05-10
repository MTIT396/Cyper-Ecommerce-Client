/**
 * Props for ProductsImageSlider
 */
export interface ProductsImageSliderProps {
   productImages: string[]
   onImageClick?: (index: number) => void
}

export type Position = {
   x: number
   y: number
}
