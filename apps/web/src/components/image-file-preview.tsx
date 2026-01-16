import { tv } from 'tailwind-variants'

export const imageFilePreviewVariants = tv({
  base: 'rounded-lg overflow-hidden'
})

export const imageFilePreviewImageVariants = tv({
  base: 'w-full h-full object-cover'
})

interface ImageFilePreviewProps extends React.ComponentProps<'img'> {
  imageClassNames?: string
}

export function ImageFilePreview({
  className,
  imageClassNames,
  ...props
}: ImageFilePreviewProps) {
  return (
    <div className={imageFilePreviewVariants({ className })}>
      <img
        className={imageFilePreviewImageVariants({ className: imageClassNames })}
        alt="Content preview"
        {...props}
      />
    </div>
  )
}
