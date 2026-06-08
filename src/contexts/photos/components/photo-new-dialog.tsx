import { useForm } from "react-hook-form";
import Alert from "../../../components/alert";
import Button from "../../../components/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../../../components/dialog";
import ImagePreview from "../../../components/image-preview";
import InputSingleFile from "../../../components/input-single-file";
import InputText from "../../../components/input-text";
import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";
import type { Album } from "../../albums/models/album";

interface PhotoNewDialogProps {
  trigger: React.ReactNode;
}

export default function PhotoNewDialog({ trigger }: PhotoNewDialogProps) {
  const form = useForm();

  const isLoadingAlbum = false;

  const albums: Album[] = [
    { id: "1", title: "Sample Album" },
    { id: "2", title: "Another Album" },
    { id: "3", title: "Third Album" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>Adicionar nova foto</DialogHeader>

        <DialogBody className="flex flex-col gap-5">
          <InputText placeholder="Título da foto" maxLength={255} />

          <Alert>
            Tamanho máximo permitido para upload é de 50MB
            <br />. Formatos suportados: JPG, PNG e GIF.
          </Alert>

          <InputSingleFile
            form={form}
            allowedExtensions={["image/jpeg", "image/png", "image/gif"]}
            maxFileSizeInMB={50 * 1024 * 1024}
            replaceBy={<ImagePreview className="w-full h-56 " />}
          />

          <div className="space-y-3">
            <div className="flex flex-wrap gap-3">
              <Text variant="heading-small">Álbuns</Text>
              {!isLoadingAlbum &&
                albums?.length > 0 &&
                albums?.map((album) => (
                  <Button key={album.id} variant="ghost" className="truncate">
                    {album.title}
                  </Button>
                ))}
              {isLoadingAlbum &&
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
            <Button variant="secondary">Cancelar</Button>

          </DialogClose>
            <Button variant="primary">Adicionar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
