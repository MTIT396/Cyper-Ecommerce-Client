import Image from 'next/image'

interface ProductsSubSliderProps {
   productImages: string[]
   activeSlide: number
   onNavigate: (index: number) => void
}

export default function ProductsSubSlider({
   productImages,
   activeSlide,
   onNavigate
}: ProductsSubSliderProps) {
   return (
      <div
         className='flex max-h-[480px] flex-col gap-2 overflow-y-auto pr-4'
         style={{ scrollbarWidth: 'none' }}
      >
         {productImages.map((image, index) => (
            <button
               key={index}
               // onMouseEnter={() => onNavigate(index)}
               onClick={() => onNavigate(index)}
               className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                  activeSlide === index
                     ? 'border-extra-gray shadow-xl'
                     : 'hover:border-extra-gray border opacity-70 hover:opacity-100'
               }`}
            >
               <Image
                  fill
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  sizes='80px'
                  className='object-contain p-2'
                  unoptimized
               />
            </button>
         ))}
      </div>
   )
}
