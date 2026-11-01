"use client"
import { createContext, useContext, type ReactNode } from "react"
const Mode = createContext(false)
export const useEditingMode = () => useContext(Mode)
export function EditingMode({ children }: { children: ReactNode }) {
  return <Mode.Provider value>{children}</Mode.Provider>
}
