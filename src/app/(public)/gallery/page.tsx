
export const dynamic = "force-dynamic";

import GalleryPageClient from "./GalleryPageClient";
import { cloudinary } from "@/lib/cloudinary-images";
import { loadAlbums } from "@/lib/content";
import { getGoogleSheetsInstance, SHEET_TAB_IDS } from "@/lib/google-sheets";

export const metadata = {
  title: "Gallery | Life at SIA",
  description: "Explore moments of learning, creativity, and joy at SIA Khargone. View our campus, events, and student achievements.",
  openGraph: {
    title: "Gallery | Life at SIA",
    description: "Explore moments of learning, creativity, and joy at SIA Khargone.",
    images: [
      {
        url: cloudinary.annualFunction[0], // Main highlights
        width: 1200,
        height: 630,
        alt: "SIA Khargone Gallery",
      }
    ]
  }
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
        range: `${SHEET_TAB_IDS.GALLERY}!A2:H`,
      });
      const rows = response.data.values || [];
      galleryItems = rows
        .filter(row => row[0] && row[0] !== 'Id' && row[0] !== 'id') // Filter out header rows
        .map((row) => ({
          id: row[0],           // Column A: ID
          alt: row[1],          // Column B: Title/Alt
          category: row[2],     // Column C: Category
          imageId: row[3],      // Column D: ImageUrl/ImageId
        }))
        .reverse();
    }
  } catch (error: unknown) {
    console.error("Failed to load CMS gallery from sheets", error instanceof Error ? error.message : 'Unknown error');
  }

  let finalImages = [];

  const cmsImages = galleryItems.map((item): { id: string; imageUrl: string; description: string; imageHint: string } => ({
    id: `cms-${item.id}`,
    imageUrl: item.imageId.startsWith("http")
      ? item.imageId
      : `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dkits80xk"}/image/upload/c_scale,w_1200/${item.imageId}`,
    description: item.alt === "Uploaded from Admin" ? "" : item.alt,
    imageHint: item.category
  }));

  // Always load static albums as well
  const albums = await loadAlbums();
  const staticImages = albums.flatMap((album: { albumName: string; photos?: string[]; category?: string }) =>
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
