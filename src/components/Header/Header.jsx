import React from "react";
import Link from "next/link";

const Header = () => {
    return (
        <header className="bg-white shadow-md">
            <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
                <div className="flex gap-6">
                    <Link
                        href="/connection"
                        className="text-gray-700 hover:text-blue-600 font-medium transition"
                    >
                        Connection
                    </Link>
                    <Link
                        href="/uploadPage"
                        className="text-gray-700 hover:text-blue-600 font-medium transition"
                    >
                        Upload Page
                    </Link>
                    <Link
                        href="/"
                        className="text-gray-700 hover:text-blue-600 font-medium transition"
                    >
                        Home
                    </Link>
                    <Link
                        href="/blog"
                        className="text-gray-700 hover:text-blue-600 font-medium transition"
                    >
                        Blog
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
