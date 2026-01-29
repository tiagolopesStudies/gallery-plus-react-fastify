import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '@/helpers/api'

export function usePhotoAlbums() {
  const queryClient = useQueryClient()

  async function managePhotoOnAlbum(photoId: string, albumsIds: string[]) {
    try {
      await api.put(`/photos/${photoId}/albums`, {
        albumsIds
      })

      queryClient.invalidateQueries({ queryKey: ['photo', photoId] })
      queryClient.invalidateQueries({ queryKey: ['photos'] })
    } catch (error) {
      console.log('error:', error)
      toast.error('Não foi possível atualizar os álbuns da foto')
    }
  }

  return {
    managePhotoOnAlbum
  }
}
