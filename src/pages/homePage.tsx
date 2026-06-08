import Container from "../components/container";
import AlbumsFilter from "../contexts/albums/components/albums-filter";
import PhotoList from "../contexts/photos/components/photo-list";

export default function HomePage() {
  return (
    <Container>
      <AlbumsFilter
        albums={[
          { id: "1", title: "Sample Album" },
          { id: "2", title: "Another Album" },
          { id: "3", title: "Third Album" },
        ]}
        className="mb-9"
      />
      <PhotoList
        photos={[
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
        ]}
        
      />
    </Container>
  );
}
