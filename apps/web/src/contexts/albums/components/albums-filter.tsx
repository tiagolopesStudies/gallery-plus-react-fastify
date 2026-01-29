import cn from 'classnames'
import Button from '@/components/button'
import Skeleton from '@/components/skeleton'
import Text from '@/components/text'
import { usePhotos } from '@/contexts/photos/hooks/use-photos'
import type { Album } from '../models/album'

interface AlbumsFilterProps extends React.ComponentProps<'div'> {
  albums: Album[]
  loading?: boolean
}

export function AlbumsFilter({
  albums,
  loading,
  className,
  ...props
}: AlbumsFilterProps) {
  const { filters } = usePhotos()

  return (
    <div
      className={cn('flex items-center gap-3.5 overflow-x-auto', className)}
      {...props}
    >
      <Text variant="heading-small">Álbuns</Text>
      <div className="flex gap-3">
        {!loading ? (
          <>
            <Button
              type="button"
              variant={filters.albumId === null ? 'primary' : 'ghost'}
              size="sm"
              className="cursor-pointer"
              onClick={() => filters.setAlbumId(null)}
            >
              Todos
            </Button>
            {albums.map((album) => (
              <Button
                key={album.id}
                type="button"
                variant={filters.albumId === album.id ? 'primary' : 'ghost'}
                size="sm"
                className="cursor-pointer"
                onClick={() => filters.setAlbumId(album.id)}
              >
                {album.title}
              </Button>
            ))}
          </>
        ) : (
          Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={`album-button-loading-${index}`} className="w-28 h-7" />
          ))
        )}
      </div>
    </div>
  )
}
