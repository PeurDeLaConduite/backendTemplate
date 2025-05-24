// src/components/Blog/Create/components/SubtitlesDownloadButton.jsx
import React from "react";

// Simple détection d'URL YouTube ou TikTok
function isYouTubeUrl(url) {
    return typeof url === "string" && (url.includes("youtube.com") || url.includes("youtu.be"));
}

export default function SubtitlesDownloadButton({ videoUrl, onDownload }) {
    if (!isYouTubeUrl(videoUrl)) return null;
    const downsubUrl = `https://downsub.com/?url=${encodeURIComponent(videoUrl)}`;

    return (
        <a
            href={downsubUrl}
            onClick={onDownload}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-1 mb-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 transition text-sm"
            title="Télécharger les sous-titres de la vidéo"
        >
            Télécharger les sous-titres (DownSub)
        </a>
    );
}
