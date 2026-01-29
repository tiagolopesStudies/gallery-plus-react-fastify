import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { usePhotoAlbums } from '@/contexts/albums/hooks/use-photo-albums'
import { api, fetcher } from '@/helpers/api'
import type { Photo } from '../models/photo'
import type { PhotoNewFormSchema } from '../schemas'

interface PhotoDetailsResponse extends Photo {
  nextPhotoId?: string
  previousPhotoId?: string
}

export function usePhoto(id?: string) {
  const { managePhotoOnAlbum } = usePhotoAlbums()
  const navigate = useNavigate()

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
        await managePhotoOnAlbum(photo.id, payload.albumsIds)
      }

      toast.success('Foto adicionada com sucesso')
    } catch (error) {
      console.log('Erro:', error)

      toast.error('Não foi possível adicionar a foto')
    }
  }

  async function deletePhoto(photoId: string) {
    try {
      await api.delete(`/photos/${photoId}`)

      toast.success('Foto excluída com sucesso!')

      navigate('/')
    } catch (error) {
      console.log('error:', error)
      toast.error('Não foi possível excluir a foto')
    }
  }

  return {
    photo: data,
    nextPhotoId: data?.nextPhotoId,
    previousPhotoId: data?.previousPhotoId,
    isLoadingPhoto: isLoading,
    createPhoto,
    deletePhoto
  }
}
