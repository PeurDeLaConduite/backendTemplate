// src/components/Blog/BlogCard.tsx
import Link from "next/link";
import VideoEmbed from "./VideoEmbed";
import type { Post, Author } from "@/src/types/blog";

type Props = {
    post: Post;
    author: Author;
};

export default function BlogCard({ post, author }: Props) {
    return (
        <article className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold text-blue-700 mb-2">
                {/* lien client-side vers /blog/[slug] */}
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>
            <p className="text-gray-700 mb-2">{post.excerpt}</p>
            <div className="text-sm text-gray-500">
                Par {author.name} ·{" "}
                {new Date(post.createdAt).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </div>
            {post.videoUrl && (
                <VideoEmbed youtubeUrl={post.videoUrl} title={`Vidéo de ${post.title}`} />
            )}
            {/* bouton « Lire la suite » pour plus de clarté */}
            <Link
                href={`/blog/${post.slug}`}
                className="mt-3 inline-block text-blue-500 underline text-sm"
            >
                Lire la suite →
            </Link>
        </article>
    );
}
