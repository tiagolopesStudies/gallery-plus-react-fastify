import Button from '@/components/button'
import Container from '@/components/container'
import { ImagePreview } from '@/components/image-preview'
import Skeleton from '@/components/skeleton'
import Text from '@/components/text'
import { AlbumsListSelectable } from '@/contexts/albums/components/albuns-list-selectable'
import { PhotosNavigator } from '@/contexts/photos/components/photos-navigator'
import type { Photo } from '@/contexts/photos/models/photo'

export function PhotoDetailsPage() {
  const isLoadingPhoto = false
  const photo: Photo = {
    id: '2',
    imageId: 'square-cat.png',
    title: 'Olha o gatinho',
    albuns: []
  }

  return (
    <Container>
      <header className="flex items-center justify-between gap-8 mb-8">
        {!isLoadingPhoto ? (
          <Text as="h2" variant="heading-large">
            {photo.title}
          </Text>
        ) : (
          <Skeleton className="w-48 h-8" />
        )}

        <PhotosNavigator nextPhotoId="3" previousPhotoId="1" loading={isLoadingPhoto} />
      </header>

      <div className="grid grid-cols-[21rem_1fr] gap-24">
        <div className="space-y-3">
          {!isLoadingPhoto ? (
            <ImagePreview
              src={`/images/${photo.imageId}`}
              title={photo.title}
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
            albums={[
              { id: '1', title: 'Viagem' },
              { id: '2', title: 'Fotografia' },
              { id: '3', title: 'Natureza' }
            ]}
            photo={photo}
            loading={isLoadingPhoto}
          />
        </div>
      </div>
    </Container>
  )
}
