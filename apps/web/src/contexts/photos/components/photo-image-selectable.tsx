import { type ComponentProps, useState } from 'react'
import { tv } from 'tailwind-variants'
import { ImagePreview } from '@/components/image-preview'
import { InputCheckBox } from '@/components/input-checkbox'

export const photoImageSelectableVariants = tv({
  base: 'cursor-pointer relative rounded-lg',
  variants: {
    select: {
      true: 'outline-2 outline-accent-brand',
      false: null
    }
  },
  defaultVariants: {
    select: false
  }
})

interface PhotoImageSelectableProps extends ComponentProps<typeof ImagePreview> {
  selected?: boolean
  onSelectImage?: (selected: boolean) => void
}

export function PhotoImageSelectable({
  className,
  selected,
  onSelectImage,
  ...props
}: PhotoImageSelectableProps) {
  const [isSelected, setIsSelected] = useState(selected)

  function handleSelect() {
    const newValue = !isSelected

    setIsSelected(newValue)
    onSelectImage?.(newValue)
  }

  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: the label is associated with the component InputCheckBox
    <label className={photoImageSelectableVariants({ className, select: isSelected })}>
      <InputCheckBox
        size="sm"
        checked={isSelected}
        onChange={handleSelect}
        className="absolute top-1 left-1"
      />

      <ImagePreview {...props} />
    </label>
  )
}
