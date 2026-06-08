import { useParams } from "react-router";
import Container from "../components/container";
import Text from "../components/text";
import type { Photo } from "../contexts/photos/models/photos";
import Skeleton from "../components/skeleton";
import PhotoNavigator from "../contexts/photos/components/photo-navigator";
import ImagePreview from "../components/image-preview";
import Button from "../components/button";
import AlbunsListSelect from "../contexts/albums/components/albuns-list-select";

export default function PhotoDetails() {
  const { id } = useParams();

  const isLoadingPhoto = false;
  const photo = {
    id: "1",
    title: "Sample Photo",
    imageId: "sample-photo.jpg",
    albums: [
      { id: "1", title: "Sample Album" },
      { id: "2", title: "Another Album" },
      { id: "3", title: "Third Album" },
    ],
  } as Photo;

  return (
    <Container>
      <header className="flex items-center justify-between gap-8 mb-8">
        {!isLoadingPhoto ? (
          <Text variant="heading-large">{photo?.title}</Text>
        ) : (
          <Skeleton className="w-48 h-8" />
        )}
        <PhotoNavigator />
      </header>

      <div className="grid grid-cols-[21rem_1fr] gap-24">
        <div className="space-y-3">
          {!isLoadingPhoto ? (
            <ImagePreview
              src={`/images/${photo?.imageId}`}
              title={photo?.title}
              imageClassName="h-[21rem]"
            />
          ) : (
            <Skeleton className="h-[21rem]" />
          )}
          {!isLoadingPhoto ? (
            <Button variant="destructive">Excluir</Button>
          ) : (
            <Skeleton className="w-24 h-8" />
          )}
        </div>

        <div className="py-3">
          <Text as="h3" variant="heading-medium" className="mb-6">
            Àlbuns
          </Text>
          <AlbunsListSelect photo={photo} albums={[
              { id: "1", title: "Sample Album" },
              { id: "2", title: "Another Album" },
              { id: "3", title: "Third Album" },
          ]}
          loading={isLoadingPhoto}
           />
        </div>
      </div>
    </Container>
  );
}
