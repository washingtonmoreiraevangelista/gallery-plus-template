import React from "react";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../../../components/dialog";
import Button from "../../../components/button";
import InputText from "../../../components/input-text";
import Text from "../../../components/text";
import type { Photo } from "../../photos/models/photos";
import SelectCheckeboxIllustration from "../../../assets/images/select-checkbox.svg?react";
import Skeleton from "../../../components/skeleton";
import PhotoImageSelecTable from "./photo-image-selectable";

interface AlbumsNewDialogProps {
  trigger: React.ReactNode;
}

export default function AlbumsNewDialog({ trigger }: AlbumsNewDialogProps) {
  const isLoadingPhotos = false;
  const photos: Photo[] = [
    {
      id: "1",
      title: "Sample Photo",
      imageId: "sample-photo.jpg",
      albums: [
        { id: "1", title: "Sample Album" },
        { id: "2", title: "Another Album" },
        { id: "3", title: "Third Album" },
      ],
    },
    {
      id: "2",
      title: "Sample Photo",
      imageId: "sample-photo.jpg",
      albums: [
        { id: "1", title: "Sample Album" },
        { id: "2", title: "Another Album" },
        { id: "3", title: "Third Album" },
      ],
    },
    {
      id: "3",
      title: "Sample Photo",
      imageId: "sample-photo.jpg",
      albums: [
        { id: "1", title: "Sample Album" },
        { id: "2", title: "Another Album" },
        { id: "3", title: "Third Album" },
      ],
    },
  ];

  function handleTooglePhoto(selected: boolean, photoId:string){
console.log(selected,photoId)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>Criar álbum</DialogHeader>

        <DialogBody className="flex flex-col gap-5">
          <InputText placeholder="Adicione um título" />

          <div className="space-y-3">
            <Text as="div" variant="label-small" className="mb-3">
              Fotos cadastradas
            </Text>

            {!isLoadingPhotos && photos.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {photos.map((photo) => (
                  <PhotoImageSelecTable
                    key={photo.id}
                    src={`/images/${photo.imageId}`}
                    title={photo.title}
                    imageClassName="h-20 w-20 "
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
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button>Criar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
