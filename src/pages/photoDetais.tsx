import { useParams } from "react-router-dom"
import Container from "../components/container"
import Text from "../components/text"
import Skeleton from "../components/skeleton"
import PhotoNavigator from "../contexts/photos/components/photo-navigator"
import ImagePreview from "../components/image-preview"
import Button from "../components/button"
import AlbunsListSelect from "../contexts/albums/components/albuns-list-select"
import useAlbums from '../contexts/albums/hooks/use-albuns'
import usePhoto from '../contexts/photos/hooks/use-photo'
import type { Photo } from '../contexts/photos/models/photos'
import React from 'react'

export default function PhotoDetails() {
  const { id } = useParams()
  const { photo, previousPhotoId, nextPhotoId, isLoadingPhoto, deletePhoto } = usePhoto(id)
  const { albums, isLoadingAlbums } = useAlbums()
  const [isDeletePhoto, setIsDeletePhoto] = React.useTransition()

  function handledeletePhoto() {
    setIsDeletePhoto(async () => {
      await deletePhoto(photo!.id)
    })
  }

  if (!isLoadingPhoto && !photo) {
    return <div>Foto não encontrada</div>
  }

  return (
    <Container>
      <header className="flex items-center justify-between gap-8 mb-8">
        {!isLoadingPhoto ? (
          <Text variant="heading-large">{photo?.title}</Text>
        ) : (
          <Skeleton className="w-48 h-8" />
        )}
        <PhotoNavigator
          previousPhotoId={previousPhotoId}
          nextPhotoId={nextPhotoId}
          loading={isLoadingPhoto}
        />
      </header>

      <div className="grid grid-cols-[21rem_1fr] gap-24">
        <div className="space-y-3">
          {!isLoadingPhoto ? (
            <ImagePreview
              src={`${import.meta.env.VITE_IMAGES_URL}/${photo?.imageId}`}
              title={photo?.title}
              imageClassName="h-[21rem]"
            />
          ) : (
            <Skeleton className="h-[21rem]" />
          )}
          {!isLoadingPhoto ? (
            <Button
              variant="destructive"
              onClick={handledeletePhoto}
              disabled={isDeletePhoto}
            >
              {isDeletePhoto ? "Excluindo..." : "Excluir"}
            </Button>
          ) : (
            <Skeleton className="w-24 h-8" />
          )}
        </div>

        <div className="py-3">
          <Text as="h3" variant="heading-medium" className="mb-6">
            Àlbuns
          </Text>
          <AlbunsListSelect
            photo={photo as Photo}
            albums={albums}
            loading={isLoadingAlbums}
          />
        </div>
      </div>
    </Container>
  )
}
