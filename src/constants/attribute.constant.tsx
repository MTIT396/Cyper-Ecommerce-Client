import { Specifics } from '@/types/product.type'
import Image from 'next/image'

export const ICON_MAP: Record<Specifics, string> = {
   [Specifics.storage]: 'https://cdn2.fptshop.com.vn/svg/Type_Mid_90e8c3bce5.svg',
   [Specifics.size]: 'https://cdn2.fptshop.com.vn/svg/Type_Mid_90e8c3bce5.svg',
   [Specifics.version]: 'https://cdn2.fptshop.com.vn/svg/Type_Mid_90e8c3bce5.svg',
   [Specifics.operating_system]: 'https://cdn2.fptshop.com.vn/svg/Type_Mid_90e8c3bce5.svg',
   [Specifics.screen_resolution]:
      'https://cdn2.fptshop.com.vn/svg/Property_1_Full_HD_6f0edc6b81.svg',
   [Specifics.connection_port]: 'https://cdn2.fptshop.com.vn/svg/High_aabe4631a9.svg',
   [Specifics.display_tech]: 'https://cdn2.fptshop.com.vn/svg/ic_light_effect_11ea9c67d6.svg',
   [Specifics.graphics_card]: 'https://cdn2.fptshop.com.vn/svg/tsnb_gpu_72e765333a.svg',
   [Specifics.cpu]: 'https://cdn2.fptshop.com.vn/svg/Level_High_5599e942c3.svg',
   [Specifics.battery_life]:
      'https://cdn2.fptshop.com.vn/svg/tsnb_battery_time_medium_ddfd7a5cd4.svg',
   [Specifics.nfc]: 'https://cdn2.fptshop.com.vn/svg/ic_nfc_v2_1446e96338.svg',
   [Specifics.scan_frequency]: 'https://cdn2.fptshop.com.vn/svg/icon_wattagee_2_56e48b2f4a.svg',
   [Specifics.screen_size]: 'https://cdn2.fptshop.com.vn/svg/Property_1_Mid_d1a1df0b89.svg',
   [Specifics.camera]: 'https://cdn2.fptshop.com.vn/svg/Type_Very_High_038e9bb1ea.svg',
   [Specifics.ram]: 'https://cdn2.fptshop.com.vn/svg/Level_Mid_935e1f0c32.svg',
   [Specifics.screen_type]: 'https://cdn2.fptshop.com.vn/svg/TV_Screen_Type_LED_1e4ed1132d.svg',
   [Specifics.screen_standard]: 'https://cdn2.fptshop.com.vn/svg/tsnb_display_1_97232148ba.svg',
   [Specifics.chip]: 'https://cdn2.fptshop.com.vn/svg/ic_cpu_super_fast_146c2b7cdb.svg',
   [Specifics.panel]: 'https://cdn2.fptshop.com.vn/svg/tsnb_amoled_4ec8750778.svg',
   [Specifics.feature]: 'https://cdn2.fptshop.com.vn/svg/Tinh_nang_chong_on_b0e131a64f.svg',
   [Specifics.bluetooth]: 'https://cdn2.fptshop.com.vn/svg/Bluetooth_5_3_084d054efd.svg',
   [Specifics.gps]: 'https://cdn2.fptshop.com.vn/svg/Smart_Watch_GPS_GPS_8414c61fd2.svg',
   [Specifics.watch_face_size]:
      'https://cdn2.fptshop.com.vn/svg/Smart_Watch_Size_40_46mm_2efe724ee7.svg',
   [Specifics.battery_capacity]:
      'https://cdn2.fptshop.com.vn/svg/tsnb_battery_time_medium_ddfd7a5cd4.svg'
}

type Props = {
   src: Specifics
   className?: string
}

export const SpecificsIcon = ({ src, className = 'size-9 filter invert brightness-75' }: Props) => {
   const imgSrc = ICON_MAP[src]

   if (!src) return null

   return <Image width={36} height={36} src={imgSrc} className={className} alt={src} />
}
