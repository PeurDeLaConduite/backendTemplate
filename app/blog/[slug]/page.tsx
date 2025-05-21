// app/blog/[slug]/page.tsx
import { readFileSync } from "fs";
import { join } from "path";
import type { Metadata, ResolvingMetadata } from "next";
import Blog from "@components/Blog/Blog";
import type { Section, Post, Author } from "@src/types/blog";
type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

// 1) Chargement statique du JSON
function loadData() {
    const file = join(process.cwd(), "public", "data.json");
    const raw = readFileSync(file, "utf-8");
    return JSON.parse(raw) as {
        sections: Section[];
        posts: Post[];
        authors: Author[];
    };
}

// 2) Génération des chemins statiques
export async function generateStaticParams() {
    const { posts } = loadData();
    return posts.map((p) => ({ slug: p.slug }));
}

// 3) Metadata — `params` est une Promise

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // 1) await les params (Next 15 les rend asynchrones)
    const { slug } = await params;

    // 2) chargez vos données
    const { posts } = loadData();
    const post = posts.find((p) => p.slug === slug)!;

    // 3) vous pouvez étendre le metadata parent si besoin
    const parentMeta = await parent;
    const previousImages = parentMeta.openGraph?.images || [];

    return {
        title: post.seo.title,
        description: post.seo.description,
        openGraph: {
            images: post.seo.image ? [post.seo.image, ...previousImages] : previousImages,
        },
    };
}

// 4) Page component — `params` est une Promise
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { sections, posts, authors } = loadData();
    const post = posts.find((p) => p.slug === slug)!;

    return <Blog data={{ sections, posts, authors }} singlePost={post} />;
}
