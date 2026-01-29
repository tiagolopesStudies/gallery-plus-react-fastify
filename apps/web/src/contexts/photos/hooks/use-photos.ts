import { useQuery } from '@tanstack/react-query'
import { createSerializer, parseAsString, useQueryState } from 'nuqs'
import { fetcher } from '@/helpers/api'
import type { Photo } from '../models/photo'

export function usePhotos() {
  const toSearchParams = createSerializer({
    albumId: parseAsString,
    q: parseAsString
  })

  const [albumId, setAlbumId] = useQueryState('albumId')
  const [query, setQuery] = useQueryState('q')

  const { data, isLoading } = useQuery<Photo[]>({
    queryKey: ['photos', albumId, query],
    queryFn: () => fetcher(`/photos${toSearchParams({ albumId, q: query })}`)
  })

  return {
    photos: data ?? [],
    isLoadingPhotos: isLoading,
    filters: {
      albumId,
      setAlbumId,
      query,
      setQuery
    }
  }
}
