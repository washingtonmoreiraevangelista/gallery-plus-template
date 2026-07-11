import { toast } from 'sonner'
import type { AlbumNewFormSchema } from '../models/schemas'
import type { Album } from '../models/album'
import { api } from '../../../helpers/api'
import { useQueryClient } from '@tanstack/react-query'
import usePhotos from '../../photos/hooks/use-photos'



export default function useAlbum() {
  const queryclient = useQueryClient()
  const { photos } = usePhotos()

  async function createAlbum(payload: AlbumNewFormSchema) {
    try {
      const { data: album } = await api.post<Album>("/albums", {
        title: payload.title
      })

      if (payload.photosIds) {
        await Promise.all(payload.photosIds.map((photoId) => {
          const photoAlbumIds =
            photos.find(photo => photo.id === photoId)?.albums?.map(album => album.id) ?? []

          return api.put(`/photos/${photoId}/albums`, {
            albumsIds: [...photoAlbumIds, album.id],
          })
        })
        )
      }

      queryclient.invalidateQueries({ queryKey: ["albums"] })
      queryclient.invalidateQueries({ queryKey: ["photos"] })

      toast.success("Album criado com sucesso")
    } catch (error) {
      toast.error("Erro ao criar album")
      throw error
    }
  }

  return {
    createAlbum
  }
}