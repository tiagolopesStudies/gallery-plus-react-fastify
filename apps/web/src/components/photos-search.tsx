import { type ChangeEvent, useCallback, useState } from 'react'
import { SearchIcon } from '@/assets/icons'
import { usePhotos } from '@/contexts/photos/hooks/use-photos'
import { debounce } from '@/helpers/utils'
import { InputText } from './input-text'

export function PhotosSearch() {
  const { filters } = usePhotos()
  const [inputValue, setInputValue] = useState(filters.query ?? '')

  const debouncedSetValue = useCallback(
    debounce((value: string) => {
      filters.setQuery(value)
    }, 200),
    []
  )

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    setInputValue(value)
    debouncedSetValue(value)
  }

  return (
    <InputText
      icon={SearchIcon}
      placeholder="Buscar fotos"
      className="flex-1"
      value={inputValue}
      onChange={handleInputChange}
    />
  )
}
