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

export interface AlbumNewDialogProps {
  trigger: React.ReactNode
}

export function AlbumNewDialog({ trigger }: AlbumNewDialogProps) {
  const { photos, isLoadingPhotos } = usePhotos()

  function handleTogglePhoto(_selected: boolean, _photoId: string) {}

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>Criar álbum</DialogHeader>

        <DialogBody className="flex flex-col gap-5">
          <InputText placeholder="Adicione um título" />

          <div className="flex flex-col gap-3">
            <Text variant="label-small">Fotos cadastradas</Text>

            {isLoadingPhotos && (
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={`photo-loading-${index}`} className="size-20 rounded" />
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
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>

          <Button type="button">Criar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
