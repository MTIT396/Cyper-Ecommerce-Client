import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const MAX_HISTORY = 10

interface SearchHistoryStoreState {
   history: string[]
   addSearch: (keyword: string) => void
   removeSearch: (keyword: string) => void
   clearHistory: () => void
}

export const useSearchHistoryStore = create<SearchHistoryStoreState>()(
   persist(
      (set) => ({
         history: [],

         addSearch: (keyword) => {
            if (!keyword.trim()) return
            set((prev) => ({
               history: [keyword, ...prev.history.filter((item) => item !== keyword)].slice(
                  0,
                  MAX_HISTORY
               )
            }))
         },

         removeSearch: (keyword) => {
            if (!keyword.trim()) return
            set((prev) => ({
               history: prev.history.filter((item) => item !== keyword)
            }))
         },

         clearHistory: () => set({ history: [] })
      }),
      { name: 'search-history' }
   )
)
