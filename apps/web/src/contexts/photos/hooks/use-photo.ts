import { useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api, fetcher } from '@/helpers/api'
import type { Photo } from '../models/photo'
import type { PhotoNewFormSchema } from '../schemas'

interface PhotoDetailsResponse extends Photo {
  nextPhotoId?: string
  previousPhotoId?: string
}

export function usePhoto(id?: string) {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery<PhotoDetailsResponse>({
    queryKey: ['photo', id],
    queryFn: () => fetcher(`/photos/${id}`),
    enabled: !!id
  })

  async function createPhoto(payload: PhotoNewFormSchema) {
    try {
      const { data: photo } = await api.post<Photo>('/photos', {
        title: payload.title
      })

      await api.post(
        `/photos/${photo.id}/image`,
        {
          file: payload.file[0]
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      if (payload.albumsIds && payload.albumsIds.length > 0) {
        await api.put(`photos/${photo.id}/albums`, {
          albumsIds: payload.albumsIds
        })
      }

      queryClient.invalidateQueries({ queryKey: ['photos'] })

      toast.success('Foto adicionada com sucesso')
    } catch (error) {
      console.log('Erro:', error)

      toast.error('Não foi possível adicionar a foto')
    }
  }

  return {
    photo: data,
    nextPhotoId: data?.nextPhotoId,
    previousPhotoId: data?.previousPhotoId,
    isLoadingPhoto: isLoading,
    createPhoto
  }
}
