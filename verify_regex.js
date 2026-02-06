
const videoSrc = "https://www.youtube.com/embed/5ObfN8wX0Jg?si=auIIJ-lhRmK36LEy&start=3";
const getYoutubeId = (url) => {
    if (!url) return "";
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : "";
};

console.log("Extracted ID:", getYoutubeId(videoSrc));
