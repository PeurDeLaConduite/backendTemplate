import React from "react";
import Blog from "@/src/components/Blog/Blog";
import blogData from "../../public/data.json";

export default function BlogPage() {
    return <Blog data={blogData} />;
}
