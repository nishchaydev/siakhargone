import { loadAlbums } from "@/lib/content";
import GalleryPageClient from "./GalleryPageClient";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const albums = await loadAlbums();

  // Flatten images for the "All" view or keep them specific?
  // Previous logic flattened them.
  const allImages = albums.flatMap(album =>
    album.photos.map(img => ({
      id: img,
      imageUrl: img,
      description: album.albumName,
      imageHint: album.albumName
    }))
  );

  const categories = albums.map(a => a.albumName);

  return (
    <GalleryPageClient
      initialImages={allImages}
      categories={categories}
    />
  );
}
