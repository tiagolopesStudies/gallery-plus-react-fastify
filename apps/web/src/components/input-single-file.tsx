import { tv, type VariantProps } from 'tailwind-variants'
import fileImageIcon from '../assets/icons/image.svg?react'
import uploadFileIcon from '../assets/icons/upload-file.svg?react'
import Icon from './icon'
import Text, { textVariants } from './text'

export const inputSingleFileVariants = tv({
  base: 'flex flex-col items-center justify-center w-full border border-border-primary group-hover:border-border-active rounded-lg gap-1 transition',
  variants: {
    size: {
      md: 'px-5 py-6'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

export const inputSingleFileIconVariants = tv({
  base: 'fill-placeholder',
  variants: {
    size: {
      md: 'size-8'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

interface InputSingleFileProps
  extends Omit<React.ComponentProps<'input'>, 'size'>,
    VariantProps<typeof inputSingleFileVariants> {
  error?: React.ReactNode
}

export function InputSingleFile({ size, error }: InputSingleFileProps) {
  return (
    <div>
      <div className="w-full relative group cursor-pointer">
        <input
          type="file"
          className="absolute top-0 right-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className={inputSingleFileVariants({ size })}>
          <Icon svg={uploadFileIcon} className={inputSingleFileIconVariants({ size })} />
          <Text variant="label-medium" className="text-placeholder text-center">
            Arraste o arquivo aqui
            <br />
            Ou clique para selecionar
          </Text>
        </div>
      </div>
      {error && (
        <Text variant="label-small" className="text-accent-red">
          {error}
        </Text>
      )}

      <div className="flex gap-3 items-center border border-border-primary mt-5 p-3 rounded">
        <Icon svg={fileImageIcon} className="fill-white size-6" />
        <div className="flex flex-col">
          <div className="truncate max-w-80">
            <Text variant="label-medium" className="text-placeholder">
              Nome do arquivo.png
            </Text>
          </div>
          <div className="flex">
            <button
              type="button"
              className={textVariants({
                variant: 'label-small',
                className: 'text-accent-red cursor-pointer hover:underline'
              })}
            >
              Remover
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
