import Divider from '@/components/divider'
import { InputCheckBox } from '@/components/input-checkbox'
import Skeleton from '@/components/skeleton'
import Text from '@/components/text'
import type { Photo } from '@/contexts/photos/models/photo'
import type { Album } from '../models/album'

interface AlbumsListSelectableProps {
  loading?: boolean
  albums: Album[]
  photo: Photo
}

export function AlbumsListSelectable({
  loading,
  albums,
  photo
}: AlbumsListSelectableProps) {
  function isChecked(albumId: string) {
    return photo.albums.some((album) => album.id === albumId)
  }

  function handlePhotoOnAlbums(albumId: string) {
    let albumsIds: string[] = []

    if (isChecked(albumId)) {
      albumsIds = photo.albums
        .filter((album) => album.id !== albumId)
        .map((album) => album.id)
    } else {
      albumsIds = [...photo.albums.map((album) => album.id), albumId]
    }

    return albumsIds
  }

  return (
    <ul className="flex flex-col gap-4">
      {!loading &&
        albums.length > 0 &&
        albums.map((album, index) => (
          <li key={album.id}>
            <div className="flex items-center justify-between gap-1">
              <Text variant="paragraph-large" className="truncate">
                {album.title}
              </Text>
              <InputCheckBox
                defaultChecked={isChecked(album.id)}
                onClick={() => handlePhotoOnAlbums(album.id)}
              />
            </div>
            {index < albums.length - 1 && <Divider className="mt-4" />}
          </li>
        ))}
      {loading &&
        Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={`albuns-list-${index}`} className="h-10" />
        ))}
    </ul>
  )
}
