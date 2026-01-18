import cn from 'classnames'
import { useMemo } from 'react'
import { useWatch } from 'react-hook-form'
import { tv, type VariantProps } from 'tailwind-variants'
import fileImageIcon from '../assets/icons/image.svg?react'
import uploadFileIcon from '../assets/icons/upload-file.svg?react'
import Icon from './icon'
import Text, { textVariants } from './text'

export const inputSingleFileVariants = tv({
  base: cn(
    'flex flex-col items-center justify-center w-full border',
    'border-border-primary group-hover:border-border-active rounded-lg gap-1 transition'
  ),
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
  // biome-ignore lint/suspicious/noExplicitAny: It can be of different types.
  form: any
  allowedExtensions: string[]
  maxFileSizeInMb: number
  replaceBy: React.ReactNode
  error?: React.ReactNode
}

export function InputSingleFile({
  size,
  error,
  form,
  allowedExtensions,
  maxFileSizeInMb,
  replaceBy,
  ...props
}: InputSingleFileProps) {
  const formValues = useWatch({ control: form.control })
  const name = props.name ?? ''

  const formFile: File | null = useMemo(() => formValues[name]?.[0], [formValues, name])
  const { fileExtension, fileSize } = useMemo(
    () => ({
      fileExtension: formFile?.name.split('.').pop()?.toLowerCase() ?? '',
      fileSize: formFile?.size ?? 0
    }),
    [formFile]
  )

  function isValidExtension() {
    return allowedExtensions.includes(fileExtension)
  }

  function isValidFileSize() {
    return fileSize <= maxFileSizeInMb * 1024 * 1024
  }

  function isValidFile() {
    return isValidExtension() && isValidFileSize()
  }

  return (
    <div>
      {!formFile || !isValidFile() ? (
        <>
          <div className="w-full relative group cursor-pointer">
            <input
              type="file"
              className="absolute top-0 right-0 w-full h-full opacity-0 cursor-pointer"
              {...props}
            />

            <div className={inputSingleFileVariants({ size })}>
              <Icon
                svg={uploadFileIcon}
                className={inputSingleFileIconVariants({ size })}
              />
              <Text variant="label-medium" className="text-placeholder text-center">
                Arraste o arquivo aqui
                <br />
                Ou clique para selecionar
              </Text>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-1">
            {formFile && !isValidExtension() && (
              <Text variant="label-small" className="text-accent-red">
                Tipo de arquivo inválido
              </Text>
            )}
            {formFile && !isValidFileSize() && (
              <Text variant="label-small" className="text-accent-red">
                Tamanho do arquivo ultrapassa {maxFileSizeInMb}mb
              </Text>
            )}
            {error && (
              <Text variant="label-small" className="text-accent-red">
                {error}
              </Text>
            )}
          </div>
        </>
      ) : (
        <>
          {replaceBy}
          <div className="flex gap-3 items-center border border-border-primary mt-5 p-3 rounded">
            <Icon svg={fileImageIcon} className="fill-white size-6" />
            <div className="flex flex-col">
              <div className="truncate max-w-80">
                <Text variant="label-medium" className="text-placeholder">
                  {formFile.name}
                </Text>
              </div>
              <div className="flex">
                <button
                  type="button"
                  className={textVariants({
                    variant: 'label-small',
                    className: 'text-accent-red cursor-pointer hover:underline'
                  })}
                  onClick={() => form.setValue(name, undefined)}
                >
                  Remover
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
