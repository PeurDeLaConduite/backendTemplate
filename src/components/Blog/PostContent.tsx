// src/components/Blog/PostContent.tsx
import React from "react";
import VideoEmbed from "./VideoEmbed";
import { Post, Author } from "@src/types/blog";
import { BackButton } from "@/src/components/buttons/Buttons";

type PostContentProps = {
    post: Post & { content: string };
    author: Author;
};

const PostContent: React.FC<PostContentProps> = ({ post, author }) => (
    <>
        {/* ↩ Lien de retour : pas de onClick, c'est du Server Component */}
        <div className="max-w-5xl mx-auto px-4 py-4">
            <BackButton href={"/blog"} label="Retour au blog" className="inline-block" />
        </div>

        <article className="prose lg:prose-xl mx-auto py-8">
            <h1>{post.title}</h1>
            <div className="text-sm text-gray-500 mb-6">
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

            <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
    </>
);

export default PostContent;
