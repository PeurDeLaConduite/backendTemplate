"use client";
import React, { useState } from "react";
import SectionsForm from "./SectionsForm";
import PostsForm from "./PostsForm";
import AuthorsForm from "./AuthorsForm";
import { saveAs } from "file-saver";
const CreateBlog = () => {
    const [sections, setSections] = useState([]);
    const [posts, setPosts] = useState([]);
    const [authors, setAuthors] = useState([]);
    const generateJSON = () => {
        const data = {
            sections,
            posts,
            authors,
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: "application/json",
        });
        saveAs(blob, "blog-data.json");
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Générateur de fichier JSON de blog</h1>
            <SectionsForm sections={sections} setSections={setSections} />
            <PostsForm posts={posts} setPosts={setPosts} sections={sections} />
            <AuthorsForm authors={authors} setAuthors={setAuthors} />
            <button
                onClick={generateJSON}
                className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Télécharger le fichier JSON
            </button>
        </div>
    );
};

export default CreateBlog;
