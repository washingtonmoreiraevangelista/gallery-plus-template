import React from "react"
import SelectCheckeboxIllustration from "../../../assets/images/select-checkbox.svg?react"
import Button from "../../../components/button"
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../../../components/dialog"
import InputText from "../../../components/input-text"
import Skeleton from "../../../components/skeleton"
import Text from "../../../components/text"
import usePhotos from '../../photos/hooks/use-photos'
import PhotoImageSelecTable from "./photo-image-selectable"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { albumNewFormsSchema, type AlbumNewFormSchema } from '../models/schemas'
import useAlbum from '../hooks/use-album'

interface AlbumsNewDialogProps {
  trigger: React.ReactNode
}

export default function AlbumsNewDialog({ trigger }: AlbumsNewDialogProps) {
  const { photos, isLoadingPhotos } = usePhotos()
  const [modalOpen, setModalOpen] = React.useState(false)
  const form = useForm<AlbumNewFormSchema>({
    resolver: zodResolver(albumNewFormsSchema)
  })

  const { createAlbum } = useAlbum()
  const [isCreatingAlbum, setIsCreatingAlbum] = React.useTransition()

  React.useEffect(() => {
    if (!modalOpen) {
      form.reset()
    }
  }, [modalOpen, form])


  function handleTooglePhoto(selected: boolean, photoId: string) {
    console.log("photoId:", photoId)
    console.log("typeof:", typeof photoId)

    const photosIds = form.getValues("photosIds") || []

    const newValue = selected
      ? [...photosIds, photoId]
      : photosIds.filter((id) => id !== photoId)

    form.setValue("photosIds", newValue)
  }

  function handleSubmit(payload: AlbumNewFormSchema) {
    setIsCreatingAlbum(async () => {
      await createAlbum(payload)
      setModalOpen(false)
    })
  }


  return (
    <Dialog
      open={modalOpen}
      onOpenChange={setModalOpen}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <form
          onSubmit={form.handleSubmit(
            handleSubmit,
            (errors) => console.log(errors)
          )}
        >
          <DialogHeader>Criar álbum</DialogHeader>

          <DialogBody className="flex flex-col gap-5">
            <InputText
              placeholder="Adicione um título"
              error={form.formState.errors.title?.message}
              {...form.register('title')}
            />

            <div className="space-y-3">
              <Text as="div" variant="label-small" className="mb-3">
                Fotos cadastradas
              </Text>

              {!isLoadingPhotos && photos.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {photos.map((photo) => (
                    <PhotoImageSelecTable
                      key={photo.id}
                      src={`${import.meta.env.VITE_IMAGES_URL}/${photo.imageId}`}
                      title={photo.title}
                      imageClassName="h-20 w-20"
                      onSelectImage={(selected) => handleTooglePhoto(selected, photo.id)}
                    />
                  ))}
                </div>
              )}

              {isLoadingPhotos && (
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} className="h-20 w-20 rounded-lg" />
                  ))}
                </div>
              )}

              {!isLoadingPhotos && photos.length === 0 && (
                <div className="w-full flex flex-col justify-center items-center gap-3 ">
                  <SelectCheckeboxIllustration className="w-16" />
                  <Text variant="paragraph-medium" className="text-center">
                    Nenhuma foto cadastrada
                  </Text>
                </div>
              )}
            </div>
          </DialogBody>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="secondary"
                disabled={isCreatingAlbum}
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isCreatingAlbum}
              handling={isCreatingAlbum}
            >
              {isCreatingAlbum ? "Criando" : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
