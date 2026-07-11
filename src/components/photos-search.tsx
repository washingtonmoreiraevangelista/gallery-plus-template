/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import SearchIcon from "../assets/icons/search.svg?react"
import usePhotos from '../contexts/photos/hooks/use-photos'
import { debounce } from "../helpers/utils"
import InputText from "./input-text"

export default function PhotosSearch() {
  const [inputValue, setInputValue] = React.useState("")
  const { filters } = usePhotos()

  const debouncedSearch = React.useCallback(
    debounce((value: string) => {
      filters.setQ(value)
    }, 1000),
    [filters.setQ],
  )

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value

    setInputValue(value)
    debouncedSearch(value)
  }

  return (
    <InputText
      icon={SearchIcon}
      placeholder="Pesquisar fotos"
      className="flex-1"
      value={inputValue}
      onChange={handleInputChange}
    />
  )
}
