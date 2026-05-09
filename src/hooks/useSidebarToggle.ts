'use client'

import { useState } from 'react'

/**
 * Custom hook for managing sidebar visibility state
 * Reusable across multiple pages and components
 *
 * Usage:
 * const { isShowSidebar, toggleSidebar } = useSidebarToggle()
 */
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
