import { createContext, useContext, useState } from 'react'

const UIContext = createContext()

export const UIProvider = ({ children }) => {
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('All')

  return (
    <UIContext.Provider value={{ search, setSearch, genre, setGenre }}>
      {children}
    </UIContext.Provider>
  )
}

export const useUI = () => useContext(UIContext)
