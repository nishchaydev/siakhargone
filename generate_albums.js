
const fs = require('fs');
const path = require('path');

const ROOT = 'public/siakhargone-content';
const PUBLIC_BASE = '/siakhargone-content';

function listFilesRecursive(dir, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory()) {
            listFilesRecursive(fullPath, fileList);
        } else {
            if (['.jpg', '.jpeg', '.png'].includes(path.extname(file.name).toLowerCase())) {
                fileList.push(fullPath);
            }
        }
    }
    return fileList;
}

const allImages = listFilesRecursive(ROOT);
const albumsMap = {};

allImages.forEach(img => {
    // normalized path
    const normalized = img.split(path.sep).join('/');
    const relPath = normalized.replace('public', '');

    // Determine album name from parent folder
    const parts = normalized.split('/');
    // structure: public/siakhargone-content/Photo For Uploads/[Album]/[SubAlbum]...
    // We want the last folder name before the file as the album name
    const albumName = parts[parts.length - 2];

    if (!albumsMap[albumName]) {
        albumsMap[albumName] = [];
    }
    albumsMap[albumName].push(relPath);
});

const albums = Object.keys(albumsMap).map(name => ({
    albumName: name,
    coverPhoto: albumsMap[name][0],
    photos: albumsMap[name]
}));

fs.writeFileSync('albums_fixed.json', JSON.stringify(albums, null, 2), 'utf-8');
