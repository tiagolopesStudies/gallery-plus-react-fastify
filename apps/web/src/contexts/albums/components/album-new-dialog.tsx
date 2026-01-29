import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { SelectCheckboxIllustration } from '@/assets/images'
import Button from '@/components/button'
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from '@/components/dialog'
import { InputText } from '@/components/input-text'
import Skeleton from '@/components/skeleton'
import Text from '@/components/text'
import { PhotoImageSelectable } from '@/contexts/photos/components/photo-image-selectable'
import { usePhotos } from '@/contexts/photos/hooks/use-photos'
import { env } from '@/helpers/env'
import { useAlbum } from '../hooks/use-album'
import { type AlbumNewFormSchema, albumNewFormSchema } from '../schemas'

export interface AlbumNewDialogProps {
  trigger: React.ReactNode
}

export function AlbumNewDialog({ trigger }: AlbumNewDialogProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [isCreatingAlbum, setIsCreatingAlbum] = useTransition()

  const form = useForm<AlbumNewFormSchema>({
    resolver: zodResolver(albumNewFormSchema)
  })
  const { createAlbum } = useAlbum()
  const { photos, isLoadingPhotos } = usePhotos()

  useEffect(() => {
    if (!modalOpen) {
      form.reset()
    }
  }, [modalOpen, form])

  function handleTogglePhoto(selected: boolean, photoId: string) {
    const photosIds = form.getValues('photosIds') ?? []
    const newValue = selected
      ? [...photosIds, photoId]
      : photosIds.filter((id) => id !== photoId)

    form.setValue('photosIds', newValue)
  }

  function handleSubmit(payload: AlbumNewFormSchema) {
    setIsCreatingAlbum(async () => {
      await createAlbum(payload)
      setModalOpen(false)
    })
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogHeader>Criar álbum</DialogHeader>

          <DialogBody className="flex flex-col gap-5">
            <InputText
              placeholder="Adicione um título"
              error={form.formState.errors.title?.message}
              {...form.register('title')}
            />

            <div className="flex flex-col gap-3">
              <Text variant="label-small">Fotos cadastradas</Text>

              {isLoadingPhotos && (
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                      key={`photo-loading-${index}`}
                      className="size-20 rounded"
                    />
                  ))}
                </div>
              )}

              {!isLoadingPhotos && photos.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {photos.map((photo) => (
                    <PhotoImageSelectable
                      key={photo.id}
                      src={`${env.VITE_IMAGES_URL}/${photo.imageId}`}
                      title={photo.title}
                      onSelectImage={(selected) => handleTogglePhoto(selected, photo.id)}
                      imageClassNames="size-20 rounded"
                    />
                  ))}
                </div>
              )}

              {!isLoadingPhotos && photos.length === 0 && (
                <div className="w-full flex flex-col justify-center items-center gap-3">
                  <SelectCheckboxIllustration />
                  <Text variant="paragraph-medium" className="text-center">
                    Nenhuma foto disponível para seleção
                  </Text>
                </div>
              )}
            </div>
          </DialogBody>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" disabled={isCreatingAlbum}>
                Cancelar
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isCreatingAlbum} handling={isCreatingAlbum}>
              {isCreatingAlbum ? 'Criando...' : 'Criar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
