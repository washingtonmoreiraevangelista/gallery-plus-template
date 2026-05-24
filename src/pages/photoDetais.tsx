import { useParams } from "react-router";
import Text from "../components/text";


export default function PhotoDetails() {
    const { id } = useParams();
  return (
    <>
      <Text variant="heading-medium">Photo Details</Text>
      <p>Photo ID: {id}</p>
    </>
  );
}