import { loadAlbums } from "@/lib/content";
import GalleryPageClient from "../GalleryPageClient";

export const dynamic = "force-static";

export async function generateStaticParams() {
    const albums = await loadAlbums();
    return albums.map((album) => ({
        album: album.albumName,
    }));
}

export default async function AlbumPage({ params }: { params: Promise<{ album: string }> }) {

    const { album } = await params;
    const decodedAlbum = decodeURIComponent(album);
    const albums = await loadAlbums();
    const currentAlbum = albums.find(a => a.albumName === decodedAlbum);

    if (!currentAlbum) {
        return <div className="p-20 text-center">Album not found</div>;
    }

    const images = currentAlbum.photos.map(img => ({
        id: img,
        imageUrl: img,
        description: currentAlbum.albumName,
        imageHint: currentAlbum.albumName
    }));

    return (
        <GalleryPageClient
            initialImages={images}
            categories={[currentAlbum.albumName]}
        />
    );
}
