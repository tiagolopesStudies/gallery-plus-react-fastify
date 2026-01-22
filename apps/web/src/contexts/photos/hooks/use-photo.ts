import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@/helpers/api'
import type { Photo } from '../models/photo'

interface PhotoDetailsResponse extends Photo {
  nextPhotoId?: string
  previousPhotoId?: string
}

export function usePhoto(id?: string) {
  const { data, isLoading } = useQuery<PhotoDetailsResponse>({
    queryKey: ['photo', id],
    queryFn: () => fetcher(`/photos/${id}`),
    enabled: !!id
  })

  return {
    photo: data,
    nextPhotoId: data?.nextPhotoId,
    previousPhotoId: data?.previousPhotoId,
    isLoadingPhoto: isLoading
  }
}
