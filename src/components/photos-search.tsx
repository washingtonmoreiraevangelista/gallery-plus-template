/* eslint-disable react-hooks/exhaustive-deps */
import InputText from "./input-text";
import SearchIcon from "../assets/icons/search.svg?react";
import React from "react";
import { debounce } from "../helpers/utils";

export default function PhotosSearch() {
  const [inputValue, setInputValue] = React.useState("");

  const debouncedSearch = React.useCallback(
    debounce((value: string) => {
      console.log("Searching for:", value);
    }, 1000),
    [],
  );

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setInputValue(value);
    debouncedSearch(value);
  }

  return (
    <InputText
      icon={SearchIcon}
      placeholder="Pesquisar fotos"
      className="flex-1"
      value={inputValue}
      onChange={handleInputChange}
    />
  );
}
