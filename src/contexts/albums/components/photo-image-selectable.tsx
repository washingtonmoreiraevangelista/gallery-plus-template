import React from "react";
import ImagePreview from "../../../components/image-preview";
import InputCheckBox from "../../../components/input-checkbox";
import { tv } from "tailwind-variants";

export const photoImageSelectTableVariants = tv ({
    base: "curso-pointer relative rounded-lg",
    variants:{
        select:{
            true: "outline-2  outline-brand"
        }
    }
})


interface PhotoImageSelectableProps extends React.ComponentProps<typeof ImagePreview> {
selected?: boolean
onSelectImage?: (selected: boolean) => void
}


export default function PhotoImageSelecTable({
    selected,
className,
onSelectImage,
...props
}: PhotoImageSelectableProps) {
const [isSelected,setIsSelected] = React.useState(selected)


function handleSelect() {
    const newValue = !isSelected

    setIsSelected(newValue)
    onSelectImage?.(newValue)
}


return (
    <label
    className={photoImageSelectTableVariants({
        className,
        select: isSelected
    })}
    >
        <InputCheckBox
        size="sm"
        checked={isSelected}
        onChange={handleSelect}
        className="absolute top-1 left-1"
        />

        <ImagePreview {...props}/>
    </label>
)
}