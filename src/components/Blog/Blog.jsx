import React from "react";

const Blog = ({ data }) => {
    const { sections, posts, authors } = data;

    // Fonction utilitaire pour récupérer l'auteur par ID
    const getAuthor = (id) => authors.find((a) => a.id === id);

    // Filtrer les articles publiés uniquement
    const publishedPosts = posts.filter((p) => p.status === "published");

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Blog</h1>

            {sections
                .sort((a, b) => a.order - b.order)
                .map((section) => {
                    const postsInSection = publishedPosts.filter((post) =>
                        post.sectionIds.includes(section.id)
                    );

                    if (postsInSection.length === 0) return null;

                    return (
                        <div key={section.id} className="mb-12">
                            <h2 className="text-2xl font-semibold mb-2">
                                {section.title}
                            </h2>
                            <p className="text-gray-600 mb-4">
                                {section.description}
                            </p>

                            <div className="grid gap-6 md:grid-cols-2">
                                {postsInSection.map((post) => {
                                    const author = getAuthor(post.authorId);
                                    return (
                                        <article
                                            key={post.id}
                                            className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition"
                                        >
                                            <h3 className="text-xl font-bold text-blue-700 mb-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-700 mb-2">
                                                {post.excerpt}
                                            </p>
                                            <div className="text-sm text-gray-500">
                                                Par {author.name} ·{" "}
                                                {new Date(
                                                    post.createdAt
                                                ).toLocaleDateString("fr-FR", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </div>
                                            {post.videoUrl && (
                                                <div className="mt-2">
                                                    <a
                                                        href={post.videoUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-blue-500 underline"
                                                    >
                                                        Voir la vidéo
                                                    </a>
                                                </div>
                                            )}
                                        </article>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default Blog;
