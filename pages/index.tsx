import type { NextPage } from "next";
import { SyntheticEvent, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import classnames from "classnames";

const LOCAL_STORAGE_NAME = "taggleTags";

const Home: NextPage = () => {
  let initialTags = [];
  if (typeof window !== "undefined") {
    initialTags = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME) || "[]");
    if (initialTags.length === 0) {
      initialTags = ["japanese"];
    }
  }

  const [tags, setTags] = useState([...initialTags]);
  const [query, setQuery] = useState();
  const [newTag, setNewTag] = useState("");
  const [editingTags, setEditingTags] = useState(false);

  const handleChange = (event: any) => setQuery(event?.target?.value);

  // update local storage
  useEffect(
    () => localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(tags)),
    [tags]
  );

  const handleNewTagChange = (event: any) => {
    if (event.key === "Enter" || event.keyCode === 32) {
      setTags([...tags, newTag]);
      setNewTag("");
      setEditingTags(false);
      return;
    }

    setNewTag(event?.target?.value);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  const onSearch = () => {
    const encodedParams = encodeURIComponent(`${tags.join(" ")} ${query}`);
    const googleUrl = `https://www.google.com/search?q=${encodedParams}`;
    window.location.href = googleUrl;
  };

  const onAddNewTag = () => setEditingTags(true);

  const onTagClick = (event: any) => {
    const newTags = tags.filter((t: any) => t !== event.target.innerText);
    setTags(newTags);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Google with tags</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={classnames(styles.main, "container mx-auto")}>
        <h1 className={styles.title}>Taggle</h1>
        <p className="mt-3 text-gray-700 italic">
          Search Google with predefined tags
        </p>

        <p className={styles.description}>
          <div className="">
            {tags.map((t) => (
              <span
                role="button"
                key={t}
                onClick={onTagClick}
                className="bg-green-700 text-blue-50 py-1 px-2 rounded text-sm font-bold ml-1"
              >
                {t}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline pl-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            ))}
            {editingTags && (
              <input
                autoFocus
                className="inline w-1/3 bg-white border border-gray-300 ml-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder=""
                type="text"
                name="tag"
                value={newTag}
                onChange={handleNewTagChange}
                onKeyDown={handleNewTagChange}
              />
            )}
            {!editingTags && (
              <button
                className="ml-2 underline text-base text-blue-800"
                onClick={onAddNewTag}
              >
                add
              </button>
            )}
          </div>
        </p>

        <label className="relative block min-w-full md:px-16">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-2 md:left-4 flex items-center pl-3 md:pl-16">
            <svg
              fill="#9aa0a6"
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24px"
              height="24px"
            >
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
          </span>
          <input
            className="placeholder:italic placeholder:text-gray-400 block bg-white w-full border border-gray-300 rounded-full py-4 pl-12 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder=""
            type="text"
            name="search"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </label>
        <button
          className="mt-7 px-6 py-2 text-lg round-md bg-gray-100 border-2 border-gray-100 hover:border-gray-300"
          onClick={onSearch}
        >
          Search
        </button>
      </main>

      <footer className={classnames(styles.footer, "text-sm text-gray-700")}>
        Made with ❤️ by&#160;
        <a
          className="inline-block text-sky-700"
          href="https://danielrobertson.me/"
        >
          @danielrobertson
        </a>
        &#160;and&#160;
        <a
          className="inline-block text-teal-900"
          href="https://github.com/darwin-face"
        >
          @darwin-face
        </a>
      </footer>
    </div>
  );
};

export default Home;
