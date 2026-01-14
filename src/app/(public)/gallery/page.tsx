
export const dynamic = "force-dynamic";

import GalleryPageClient from "./GalleryPageClient";
import { cloudinary } from "@/lib/cloudinary-images";
import { loadAlbums } from "@/lib/content";
import { getGoogleSheetsInstance, SHEET_TAB_IDS } from "@/lib/google-sheets";

export const metadata = {
  title: "Gallery",
  description: "Explore moments of learning, creativity, and joy at SIA Khargone.",
};

export default async function GalleryPage() {
  // Fetch Gallery from CMS (Directly from Sheets)
  let galleryItems: { id: string; imageId: string; category: string; alt: string }[] = [];
  try {
    const sheets = await getGoogleSheetsInstance();
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    if (spreadsheetId) {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${SHEET_TAB_IDS.GALLERY}!A2:C`,
      });
      const rows = response.data.values || [];
      galleryItems = rows.map((row, index) => ({
        id: `row-${index}`, // Generate a unique ID since sheet doesn't have one in this logic
        imageId: row[0],
        category: row[1],
        alt: row[2]
      })).reverse();
    }
  } catch (e) {
    console.error("Failed to load CMS gallery from sheets", e);
  }

  let finalImages = [];

  const cmsImages = galleryItems.map((item) => ({
    id: `cms-${item.id}`,
    imageUrl: item.imageId.startsWith("http")
      ? item.imageId
      : `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dkits80xk"}/image/upload/c_scale,w_1200/${item.imageId}`,
    description: item.alt === "Uploaded from Admin" ? "" : item.alt,
    imageHint: item.category
  }));

  // Always load static albums as well
  const albums = await loadAlbums();
  const staticImages = albums.flatMap((album: any) =>
    album.photos?.map((photo: string, index: number) => ({
      id: `${album.albumName}-${index}`,
      imageUrl: photo,
      description: album.albumName,
      imageHint: album.category || "All"
    })) || []
  );

  finalImages = [...cmsImages, ...staticImages];

  return (
    <GalleryPageClient initialImages={finalImages} />
  );
}
