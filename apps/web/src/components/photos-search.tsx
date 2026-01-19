import { type ChangeEvent, useCallback, useState } from 'react'
import { SearchIcon } from '@/assets/icons'
import { debounce } from '@/helpers/utils'
import { InputText } from './input-text'

export function PhotosSearch() {
  const [inputValue, setInputValue] = useState('')

  const debouncedSetValue = useCallback(
    debounce((_value: string) => {
      // chamada para a API
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
