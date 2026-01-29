import { useForm } from 'react-hook-form'
import Alert from '@/components/alert'
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
import { ImagePreview } from '@/components/image-preview'
import { InputSingleFile } from '@/components/input-single-file'
import { InputText } from '@/components/input-text'
import Skeleton from '@/components/skeleton'
import Text from '@/components/text'
import { useAlbums } from '@/contexts/albums/hooks/use-albums'

interface PhotoNewDialogProps {
  trigger: React.ReactNode
}

export function PhotoNewDialog({ trigger }: PhotoNewDialogProps) {
  const { albums, isLoadingAlbums } = useAlbums()
  const form = useForm()

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>Adicionar foto</DialogHeader>

        <DialogBody className="flex flex-col gap-5">
          <InputText placeholder="Adicione um título" maxLength={255} />

          <Alert>
            Tamanho máximo: 10MB
            <br />
            Você pode selecionar arquivos em PNG, JPG, JPEG e WEBP
          </Alert>

          <InputSingleFile
            form={form}
            allowedExtensions={['png', 'jpg', 'jpeg', 'webp']}
            maxFileSizeInMb={10}
            replaceBy={<ImagePreview className="w-full h-56" />}
          />

          <div className="flex flex-col gap-3">
            <Text variant="label-small">Selecionar álbuns</Text>

            <div className="flex flex-wrap gap-3">
              {!isLoadingAlbums &&
                albums.length > 0 &&
                albums.map((album) => (
                  <Button key={album.id} variant="ghost" size="sm" className="truncate">
                    {album.title}
                  </Button>
                ))}

              {isLoadingAlbums &&
                Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={`album-loading-${index}`} className="w-20 h-7" />
                ))}
            </div>
          </div>
        </DialogBody>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>

          <Button>Adicionar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
