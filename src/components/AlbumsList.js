import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import AlbumsListItem from "./AlbumsListItem";
import Button from "./Button";
function AlbumsList({ user }) {
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  // Mutations give you a function to run when you want to change some data.
  // The second element is an object that return the status of the request
  const [addAlbum, results] = useAddAlbumMutation();
  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;
  if (isFetching) {
    content = <Skeleton className="h-10 w-full" time={3} />;
  } else if (error) {
    content = <div>Error loading albums.</div>;
  } else {
    content = data.map((album) => {
      return <AlbumsListItem key={album.id} album={album} />;
    });
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button loading={results.isLoading} onClick={handleAddAlbum}>
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
