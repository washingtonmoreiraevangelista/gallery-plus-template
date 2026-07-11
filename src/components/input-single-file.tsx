import { type VariantProps, tv } from "tailwind-variants"
import Text, { textVariants } from "../components/text"
import Icon from "./icon"
import UpdateFileIcon from "../assets/icons/upload-file.svg?react"
import FileImageIcon from "../assets/icons/image.svg?react"
import React from "react"
import { useWatch } from "react-hook-form"

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
})

export const inputSingleFileIconVariants = tv({
  base: "fill-placeholder",
  variants: {
    size: {
      md: "w-8 h-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

interface InputSingleFileProps
  extends VariantProps<typeof inputSingleFileVariants>,
  Omit<React.ComponentProps<"input">, "size"> {
  form: any
  allowedExtensions: string[]
  replaceBy: React.ReactNode
  maxFileSizeInMB: number
  error?: React.ReactNode
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
  const formValue = useWatch({
    control: form.control,
  })

  const name = props.name || ""

  const formFile: File | undefined = React.useMemo(() => {
    return formValue[name]?.[0]
  }, [formValue, name])

  const fileType = formFile?.type ?? ""
  const fileSize = formFile?.size ?? 0

  function isValidExtension() {
    return allowedExtensions.includes(fileType)
  }

  function isValidSize() {
    return fileSize <= maxFileSizeInMB * 1024 * 1024
  }

  function isValidFile() {
    return isValidExtension() && isValidSize()
  }

  return (
    <div>
      {!formFile || !isValidFile() ? (
        <>
          <div className="relative w-full group cursor-pointer">
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              {...props}
            />

            <div className={inputSingleFileVariants({ size })}>
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

          <div className="flex flex-col gap-1 mt-2">
            {formFile && !isValidExtension() && (
              <Text
                variant="label-small"
                className="text-accent-red"
              >
                Tipo de arquivo inválido.
              </Text>
            )}

            {formFile && !isValidSize() && (
              <Text
                variant="label-small"
                className="text-accent-red"
              >
                O tamanho do arquivo ultrapassa o máximo permitido.
              </Text>
            )}

            {error && (
              <Text
                variant="label-small"
                className="text-accent-red"
              >
                {error}
              </Text>
            )}
          </div>
        </>
      ) : (
        <>
          {replaceBy}

          <div className="flex items-center gap-3 border border-border-primary rounded mt-5 p-3">
            <Icon
              svg={FileImageIcon}
              className="fill-white w-6 h-6"
            />

            <div className="flex-1">
              <Text
                variant="label-medium"
                className="truncate text-placeholder"
              >
                {formFile.name}
              </Text>

              <button
                type="button"
                onClick={() =>
                  form.setValue(name, undefined, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
                className={textVariants({
                  variant: "label-small",
                  className:
                    "text-accent-red hover:underline cursor-pointer",
                })}
              >
                Remover
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}