

import { loadAlbums } from "@/lib/content";
import GalleryPageClient from "./GalleryPageClient";

export const metadata = {
  title: "Gallery",
  description: "Explore moments of learning, creativity, and joy at SIA Khargone.",
};

export default async function GalleryPage() {
  // Fetch All Albums
  const albums = await loadAlbums();

  // Flatten photos from all albums for the main gallery view
  const allImages = albums.flatMap((album: any) =>
    album.photos?.map((photo: string, index: number) => ({
      id: `${album.albumName}-${index}`,
      imageUrl: photo,
      description: album.albumName,
      imageHint: album.category || "All"
    })) || []
  );

  return (
    <GalleryPageClient initialImages={allImages} />
  );
}
