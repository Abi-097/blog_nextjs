"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
export default function Home() {
  const [posts, SetPosts] = useState([]);
  const inputRef = useRef("");
  const [search, setSearch] = useState(false);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/posts")
      .then((res) => res.json())
      .then((res) => SetPosts(res));
  }, []);

  const searchPost = (e) => {
    if (e.type == "keydown" && e.key !== "Enter") {
      return;
    }
    setSearch(true);

    fetch(
      process.env.NEXT_PUBLIC_API_URL + "/posts?q=" + inputRef.current.value
    )
      .then((res) => res.json())
      .then((res) => SetPosts(res))
      .finally(() => setSearch(false));
  };
  return (
    <>
      <body className="bg-gray-200">
        <header className="bg-white shadow-lg">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <h1 className="text-2xl">Blog</h1>
            <nav className="space-x-4">
              <a href="#" className="text-blue-500">
                Home
              </a>
              <a href="#" className="text-blue-500">
                About
              </a>
              <a href="#" className="text-blue-500">
                Contact
              </a>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-6">
          <h2 className="text-4xl font-bold mb-4">Welcome to Our Blog</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </main>
        <div className="flex justify-end px-4">
          <input
            ref={inputRef}
            onKeyDown={searchPost}
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Search..."
          />
          <button
            onClick={searchPost}
            className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4"
            disabled={search}
          >
            {search ? "..." : "Search"}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, index) => (
            <Link href={"/post/" + post._id}>
              <div key={index} className="border border-gray-200 p-4">
                <img
                  className="w-full h-48 object-cover mb-4"
                  src={post.image}
                  alt="Post Image"
                />
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600">{post.description}</p>
              </div>
            </Link>
          ))}
          {!posts.length > 0 && inputRef.current.value && (
            <p>
              No post available on: <b>{inputRef.current.value}</b>
            </p>
          )}
        </div>
      </body>
    </>
  );
}
