import { useParams } from 'react-router'
import Button from '@/components/button'
import Container from '@/components/container'
import { ImagePreview } from '@/components/image-preview'
import Skeleton from '@/components/skeleton'
import Text from '@/components/text'
import { AlbumsListSelectable } from '@/contexts/albums/components/albuns-list-selectable'
import { useAlbums } from '@/contexts/albums/hooks/use-albums'
import { PhotosNavigator } from '@/contexts/photos/components/photos-navigator'
import { usePhoto } from '@/contexts/photos/hooks/use-photo'
import type { Photo } from '@/contexts/photos/models/photo'
import { env } from '@/helpers/env'

export function PhotoDetailsPage() {
  const { id } = useParams()
  const { photo, isLoadingPhoto, nextPhotoId, previousPhotoId } = usePhoto(id)
  const { albums, isLoadingAlbums } = useAlbums()

  if (!isLoadingPhoto && !photo) {
    return (
      <Text as="div" variant="heading-large">
        Foto não encontrada
      </Text>
    )
  }

  return (
    <Container>
      <header className="flex items-center justify-between gap-8 mb-8">
        {!isLoadingPhoto ? (
          <Text as="h2" variant="heading-large">
            {photo?.title}
          </Text>
        ) : (
          <Skeleton className="w-48 h-8" />
        )}

        <PhotosNavigator
          nextPhotoId={nextPhotoId}
          previousPhotoId={previousPhotoId}
          loading={isLoadingPhoto}
        />
      </header>

      <div className="grid grid-cols-[21rem_1fr] gap-24">
        <div className="space-y-3">
          {!isLoadingPhoto ? (
            <ImagePreview
              src={`${env.VITE_IMAGES_URL}/${photo?.imageId}`}
              title={photo?.title}
              imageClassNames="h-84"
            />
          ) : (
            <Skeleton className="h-84" />
          )}

          {!isLoadingPhoto ? (
            <Button variant="destructive">Excluir</Button>
          ) : (
            <Skeleton className="w-20 h-10" />
          )}
        </div>

        <div className="py-3">
          <Text as="h3" variant="heading-medium" className="mb-6">
            Álbuns
          </Text>

          <AlbumsListSelectable
            albums={albums}
            photo={photo as Photo}
            loading={isLoadingAlbums || isLoadingPhoto}
          />
        </div>
      </div>
    </Container>
  )
}
