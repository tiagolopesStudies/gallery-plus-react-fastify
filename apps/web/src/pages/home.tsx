import Container from '@/components/container'
import { AlbumsFilter } from '@/contexts/albums/components/albums-filter'
import { PhotosList } from '@/contexts/photos/components/photos-list'
import type { Photo } from '@/contexts/photos/models/photo'
import { UseAlbums } from '@/hooks/use-albums'

const photos: Photo[] = [
  {
    id: '1',
    imageId: '/images/' + 'wide-car.png',
    title: 'Olá mundo!',
    albums: [
      { id: '321', title: 'Album 1' },
      { id: '123', title: 'Album 2' },
      { id: '133', title: 'Album 3' }
    ]
  },
  {
    id: '2',
    imageId: '/images/' + 'wide-tree.png',
    title: 'Olá mundo!',
    albums: [
      { id: '321', title: 'Album 1' },
      { id: '123', title: 'Album 2' },
      { id: '133', title: 'Album 3' }
    ]
  },
  {
    id: '3',
    imageId: '/images/' + 'square-cat.png',
    title: 'Olá mundo!',
    albums: [
      { id: '321', title: 'Album 1' },
      { id: '123', title: 'Album 2' },
      { id: '133', title: 'Album 3' }
    ]
  },
  {
    id: '4',
    imageId: '/images/' + 'portrait-tower.png',
    title: 'Foto de uma torre',
    albums: [
      { id: '321', title: 'Album 1' },
      { id: '123', title: 'Album 2' },
      { id: '133', title: 'Album 3' }
    ]
  },
  {
    id: '5',
    imageId: '/images/' + 'portrait-tree.png',
    title: 'Foto de uma torre',
    albums: [
      { id: '321', title: 'Album 1' },
      { id: '123', title: 'Album 2' },
      { id: '133', title: 'Album 3' }
    ]
  }
]

export function HomePage() {
  const { albums, isLoadingAlbums } = UseAlbums()

  return (
    <Container>
      <AlbumsFilter albums={albums} loading={isLoadingAlbums} className="mb-9" />

      <PhotosList photos={photos} />
    </Container>
  )
}
