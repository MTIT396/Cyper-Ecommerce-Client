import ProfileLayout from '@/components/features/profile/ProfileLayout'
import { ReactNode } from 'react'

interface Props {
   children: ReactNode
}

export default function Layout({ children }: Props) {
   return <ProfileLayout>{children}</ProfileLayout>
}
