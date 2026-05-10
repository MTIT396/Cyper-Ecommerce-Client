'use client'

import { useState } from 'react'

export function useSidebarToggle(initialState: boolean = false) {
   const [isShowSidebar, setIsShowSidebar] = useState(initialState)

   const toggleSidebar = () => {
      setIsShowSidebar((prev) => !prev)
   }

   return {
      isShowSidebar,
      toggleSidebar,
      setIsShowSidebar
   }
}
