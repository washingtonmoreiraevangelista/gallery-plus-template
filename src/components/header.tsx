import React from "react";
import Container from "./container";
import Logo from "../assets/images/galeria-plus-full-logo.svg?react";
import { Link } from "react-router";
import cx from "classnames";
import Button from "./button";
import PhotosSearch from "./photos-search";
import Divider from "./divider";
import PhotoNewDialog from "../contexts/photos/components/photo-new-dialog";
import AlbumsNewDialog from "../contexts/albums/components/albums-new-dialog";

interface HeaderProps extends React.ComponentProps<typeof Container> {}

export default function Header({ className, ...props }: HeaderProps) {
  return (
    <Container
      as="header"
      className={cx("flex justify-between items-center gap-10", className)}
      {...props}
    >
      <Link to="/">
        <Logo className="h-5" />
      </Link>
      <PhotosSearch/>

      <Divider orientation="vertical" className="h-10" />

      <div className="flex items-center gap-3">
        <PhotoNewDialog trigger={<Button>Nova foto</Button>} />
        <AlbumsNewDialog trigger={<Button variant="secondary">Criar álbum</Button>} />
      </div>
    </Container>
  );
}
