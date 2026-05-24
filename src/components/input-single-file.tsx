import { type VariantProps, tv } from "tailwind-variants";
import Text, { textVariants } from "../components/text";
import Icon from "./icon";
import UpdateFileIcon from "../assets/icons/upload-file.svg?react";
import FileImageIcon from "../assets/icons/image.svg?react";
import React from "react";
import { useWatch } from "react-hook-form";

export const inputSingleFileVariants = tv({
  base: `
flex flex-col items-center justify-center w-full
border border-solid border-border-primary
group-hover:border-border-active
rounded-lg gap-1 transition
`,
  variants: {
    size: {
      md: "px-5 py-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const inputSingleFileIconVariants = tv({
  base: "fill-placeholder", // ✅ Fix 6: corrigido typo "fill-placeeholder" → "fill-placeholder"
  variants: {
    size: {
      md: "w-8 h-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface InputSingleFileProps
  extends
    VariantProps<typeof inputSingleFileVariants>,
    Omit<React.ComponentProps<"input">, "size"> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  allowedExtensions: string[]; 
  replaceBy: React.ReactNode;
  maxFileSizeInMB: number;
  error?: React.ReactNode;
}

export default function InputSingleFile({
  size,
  error,
  form,
  allowedExtensions, 
  maxFileSizeInMB,
  replaceBy,
  ...props
}: InputSingleFileProps) {
  const formValue = useWatch({ control: form.control });
  const name = props.name || "";

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const formFile: File = React.useMemo(
    () => formValue[name]?.[0],
    [formValue, name],
  );

  const { fileExtension, fileSize } = React.useMemo(() => ({
    fileExtension: formFile?.name?.split(".")?.pop()?.toLowerCase() || "",
    fileSize: formFile?.size || 0,
  }), [formFile]);

  function isValidExtension() {
    return allowedExtensions.includes(fileExtension); // ✅ Fix 5
  }

  function isValidSize() {
    return fileSize <= maxFileSizeInMB * 1024 * 1024;
  }

  function isValidFile() {
    return isValidExtension() && isValidSize();
  }

  return (
    <div>
      {/* ✅ Fix 2: condição corrigida — mostra upload quando NÃO há arquivo válido */}
      {!formFile || !isValidFile() ? (
        <>
          <div className="w-full relative group cursor-pointer">
            <input
              type="file"
              className={`
                absolute top-0 right-0 w-full h-full
                opacity-0 cursor-pointer
              `}
              {...props}
            />
            <div className={inputSingleFileVariants()}>
              <Icon
                svg={UpdateFileIcon}
                className={inputSingleFileIconVariants({ size })}
              />
              <Text
                variant="label-medium"
                className="text-placeholder text-center"
              >
                Arraste o arquivo
                <br />
                ou clique para selecionar
              </Text>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-1">
            {/* ✅ Fix 1: adicionado "!" — erro só aparece quando extensão é INVÁLIDA */}
            {formFile && !isValidExtension() && (
              <Text variant="label-small" className="text-accent-red">
                Tipo de Arquivo inválido
              </Text>
            )}
            {/* ✅ Fix 1: adicionado "!" — erro só aparece quando tamanho é INVÁLIDO */}
            {formFile && !isValidSize() && (
              <Text variant="label-small" className="text-accent-red">
                O tamanho do arquivo ultrapassa o máximo
              </Text>
            )}
            {error && (
              <Text variant="label-small" className="text-accent-red">
                {error}
              </Text>
            )}
          </div>
        </>
      ) : (
        <>
          {replaceBy}
          <div className="flex gap-3 items-center border border-solid border-border-primary mt-5 p-3 rounded">
            <Icon svg={FileImageIcon} className="fill-white w-6 h-6" />
            <div className="flex flex-col">
              <div className="truncate max-w-80">
                {/* ✅ Fix 3: exibe o nome real do arquivo em vez de texto fixo */}
                <Text variant="label-medium" className="text-placeholder">
                  {formFile?.name}
                </Text>
                <div className="flex">
                  {/* ✅ Fix 4: botão Remover agora limpa o valor no formulário */}
                  <button
                    type="button"
                    onClick={() => form.setValue(name, null)}
                    className={textVariants({
                      variant: "label-small",
                      className: "text-accent-red cursor-pointer hover:underline",
                    })}
                  >
                    Remover
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}