import { set, useForm } from "react-hook-form"
import Alert from "../../../components/alert"
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
import ImagePreview from "../../../components/image-preview"
import InputSingleFile from "../../../components/input-single-file"
import InputText from "../../../components/input-text"
import Skeleton from "../../../components/skeleton"
import Text from "../../../components/text"
import useAlbums from '../../albums/hooks/use-albuns'
import { photoNewFormsSchema, type PhotoNewFormSchema } from '../models/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import usePhoto from '../hooks/use-photo'

interface PhotoNewDialogProps {
  trigger: React.ReactNode
}

export default function PhotoNewDialog({ trigger }: PhotoNewDialogProps) {
  const [modalOpen, setModalOpen] = React.useState(false)
  const form = useForm<PhotoNewFormSchema>({
    resolver: zodResolver(photoNewFormsSchema)
  })
  const { albums, isLoadingAlbums } = useAlbums()
  const { CreatePhoto } = usePhoto()
  const [isCreatingPhoto, setIsCreatingPhoto] = React.useTransition()

  const file = form.watch("file")
  const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined


  const albumsIds = form.watch("albumsIds")

  React.useEffect(() => {
    if (!modalOpen) {
      form.reset()
    }
  }, [modalOpen, form])

  function handleToggleAlbum(albumId: string) {
    const albumsIds = form.getValues("albumsIds") || []
    const albumsSet = new Set(albumsIds)

    if (albumsSet.has(albumId)) {
      albumsSet.delete(albumId)
    } else {
      albumsSet.add(albumId)
    }

    form.setValue("albumsIds", Array.from(albumsSet))

  }


  function handleSubmit(payload: PhotoNewFormSchema) {
    console.log("SUBMIT", payload)

    setIsCreatingPhoto(async () => {
      await CreatePhoto(payload)
      setModalOpen(false)
    })
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <form
          onSubmit={form.handleSubmit(
            handleSubmit,
            (errors) => {
              console.log("ERROS", errors)
            }
          )}
        >          <DialogHeader>Adicionar nova foto</DialogHeader>

          <DialogBody className="flex flex-col gap-5">
            <InputText
              placeholder="Título da foto"
              maxLength={255}
              error={form.formState.errors.title?.message}{...form.register("title")}
            />

            <Alert>
              Tamanho máximo permitido para upload é de 50MB
              <br />. Formatos suportados: JPG, PNG e GIF.
            </Alert>

            <InputSingleFile
              form={form}
              allowedExtensions={[
                "image/jpeg",
                "image/png",
                "image/gif",
                "image/webp",
              ]}
              maxFileSizeInMB={50}
              replaceBy={
                <ImagePreview
                  src={fileSource}
                  className="w-full h-56"
                />
              }
              error={form.formState.errors.file?.message}
              {...form.register("file")}
            />

            <div className="space-y-3">
              <div className="flex flex-wrap gap-3">
                <Text variant="heading-small">Álbuns</Text>
                {!isLoadingAlbums &&
                  albums?.length > 0 &&
                  albums?.map((album) => (
                    <Button
                      key={album.id}
                      variant={
                        albumsIds?.includes(album.id) ? "primary" : "ghost"
                      }
                      className="truncate"
                      onClick={() => handleToggleAlbum(album.id)}
                    >
                      {album.title}
                    </Button>
                  ))}
                {isLoadingAlbums &&
                  Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton
                      key={`album-loading-${index}`}
                      className="w-20 h-7"
                    />
                  ))}
              </div>
            </div>
          </DialogBody>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" disabled={isCreatingPhoto}>Cancelar</Button>

            </DialogClose>
            <Button
              disabled={isCreatingPhoto}
              handling={isCreatingPhoto}
              type="submit"
            >
              {isCreatingPhoto ? "Adicionando..." : "Adicionar"}

            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog >
  )
}
