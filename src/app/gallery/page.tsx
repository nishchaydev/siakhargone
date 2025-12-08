
import { fetchStrapi, getStrapiMedia } from "@/lib/strapi";
import GalleryPageClient from "./GalleryPageClient";

export const metadata = {
  title: "Gallery",
  description: "Explore moments of learning, creativity, and joy at SIA Khargone.",
};

export default async function GalleryPage() {
  // Fetch All Albums
  const albumsRes = await fetchStrapi("albums?populate=*");
  const albums = albumsRes?.data || [];

  // Flatten photos from all albums for the main gallery view
  // Or structure them by album? Existing GalleryPageClient takes a flat list.
  // We'll flatten them.
  const allImages = albums.flatMap((album: any) =>
    album.attributes.photos?.data?.map((photo: any) => ({
      id: photo.id.toString(),
      imageUrl: getStrapiMedia(photo.attributes.url),
      description: album.attributes.albumName, // Use album name as desc or photo caption if available?
      imageHint: album.attributes.description
    })) || []
  );

  return (
    <GalleryPageClient initialImages={allImages} />
  );
}
