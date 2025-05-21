export interface Author {
    id: number;
    name: string;
    // autres champs si nécessaire
}

export interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    authorId: number;
    sectionIds: string[];
    relatedPostIds: number[];
    videoUrl: string | null;
    tags: string[];
    type: string;
    status: string;
    seo: { title: string; description: string; image: string | null };
    createdAt: string;
    updatedAt: string;
}

export type Section = {
    id: string;
    title: string;
    slug: string;
    description: string;
    order: number;
    postIds: number[];
    seo?: {
        title: string;
        description: string;
        image?: string;
    };
};

export interface BlogData {
    sections: Section[];
    posts: Post[];
    authors: Author[];
}

export interface BlogProps {
    data: BlogData;
    singlePost?: Post; // optionnel pour page article
}
