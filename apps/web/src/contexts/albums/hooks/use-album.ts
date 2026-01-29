import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { usePhotos } from '@/contexts/photos/hooks/use-photos'
import { api } from '@/helpers/api'
import type { Album } from '../models/album'
import type { AlbumNewFormSchema } from '../schemas'

export function useAlbum() {
  const queryClient = useQueryClient()
  const { photos } = usePhotos()

  async function createAlbum(payload: AlbumNewFormSchema) {
    try {
      const { data: album } = await api.post<Album>('/albums', {
        title: payload.title
      })

      if (payload.photosIds && payload.photosIds.length > 0) {
        await Promise.all(
          payload.photosIds.map((photoId) => {
            const currentPhoto = photos.find((photo) => photo.id === photoId)
            const albumsIds = currentPhoto?.albums.map((album) => album.id) ?? []

            return api.put(`/photos/${photoId}/albums`, {
              albumsIds: [...albumsIds, album.id]
            })
          })
        )
      }

      queryClient.invalidateQueries({ queryKey: ['albums'] })
      queryClient.invalidateQueries({ queryKey: ['photos'] })

      toast.success('Álbum criado com sucesso!')
    } catch (error) {
      console.log('error:', error)
      toast.error('Erro ao tentar criar o álbum')
    }
  }

  return {
    createAlbum
  }
}
