import Container from '@/components/container'
import { PhotoWidget } from '@/contexts/photos/components/photo-widget'
import type { Photo } from '@/contexts/photos/models/photo'

export function HomePage() {
  return (
    <Container>
      <div className="grid grid-cols-4 gap-9">
        <PhotoWidget
          photo={{
            id: '1',
            imageId: '/images/' + 'wide-car.png',
            title: 'Olá mundo!',
            albuns: [
              { id: '321', title: 'Album 1' },
              { id: '123', title: 'Album 2' },
              { id: '133', title: 'Album 3' }
            ]
          }}
        />
        <PhotoWidget
          photo={{
            id: '1',
            imageId: '/images/' + 'wide-tree.png',
            title: 'Olá mundo!',
            albuns: [
              { id: '321', title: 'Album 1' },
              { id: '123', title: 'Album 2' },
              { id: '133', title: 'Album 3' }
            ]
          }}
        />
        <PhotoWidget
          photo={{
            id: '1',
            imageId: '/images/' + 'square-cat.png',
            title: 'Olá mundo!',
            albuns: [
              { id: '321', title: 'Album 1' },
              { id: '123', title: 'Album 2' },
              { id: '133', title: 'Album 3' }
            ]
          }}
        />
        <PhotoWidget photo={{} as Photo} loading />
      </div>
    </Container>
  )
}
