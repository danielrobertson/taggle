import type { NextPage } from "next";
import { SyntheticEvent, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import classnames from "classnames";

const Home: NextPage = () => {
  const [tag, setTag] = useState("japanese");
  const [query, setQuery] = useState();

  const handleChange = (event: any) => setQuery(event?.target?.value);

  const handleTagChange = (event: any) => setTag(event?.target?.value);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  const onSearch = () => {
    const encodedParams = encodeURIComponent(`${tag} ${query}`);
    const googleUrl = `https://www.google.com/search?q=${encodedParams}`;
    window.location.href = googleUrl;
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Google with tags</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={classnames(styles.main, "container mx-auto")}>
        <h1 className={styles.title}>Google with tags</h1>

        <p className={styles.description}>
          Current tag:
          <input
            className="inline-block placeholder:italic placeholder:text-gray-400 bg-white border border-gray-300 ml-3 py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder=""
            type="text"
            name="search"
            value={tag}
            onChange={handleTagChange}
          />
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

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
