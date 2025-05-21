// src/components/Blog/VideoEmbed.tsx
import React from "react";

/**
 * Extrait l'ID YouTube d'une URL standard ou courte
 */
export function getYouTubeEmbedUrl(url: string): string {
    try {
        const u = new URL(url);
        let id = "";
        if (u.hostname.includes("youtu.be")) {
            // short link youtu.be/ID
            id = u.pathname.slice(1);
        } else {
            // youtube.com/watch?v=ID
            id = u.searchParams.get("v") || "";
        }
        return `https://www.youtube.com/embed/${id}`;
    } catch {
        return "";
    }
}
// function getYouTubeEmbedUrl(url: string): string {
//     const match = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?&]+)/);
//     const id = match?.[1];
//     return id ? `https://www.youtube.com/embed/${id}` : "";
// }
type VideoEmbedProps = {
    youtubeUrl: string;
    title?: string;
};

const VideoEmbed: React.FC<VideoEmbedProps> = ({ youtubeUrl, title }) => {
    const embedUrl = getYouTubeEmbedUrl(youtubeUrl);
    if (!embedUrl) return null;

    return (
        <div className="mt-4 aspect-video rounded-lg overflow-hidden">
            <iframe
                className="w-full h-full"
                src={embedUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={title || "YouTube video"}
            />
        </div>
    );
};

export default VideoEmbed;
