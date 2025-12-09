import { getAlbums } from "@/lib/content";
import GalleryPageClient from "./GalleryPageClient";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const albums = await getAlbums();

  const allImages = albums.flatMap(album =>
    album.images.map(img => ({
      id: img.imageUrl,
      imageUrl: img.imageUrl,
      description: album.title,
      imageHint: album.title
    }))
  );

  const categories = albums.map(a => a.title);

  return (
    <GalleryPageClient
      initialImages={allImages}
      categories={categories}
    />
  );
}
