"use client";

import React, { useState, useEffect } from 'react';
import styles from "@/styles/ForumPage.module.scss";
import Banner from '@/components/Banner';
import LatestPosts from '@/components/LatestPosts';
import ForumPost from '@/components/ForumPost';
import Select, { StylesConfig } from 'react-select';

import { useParams } from 'next/navigation';

import data from "../../../public/data/forums.json";

import Navbar from "@/components/Navbar";

const sortOptions = [
  { value: "views", label: "Views" },
  { value: "likes", label: "Likes" },
  { value: "threads", label: "Threads" },
  { value: "latest", label: "Latest" },
];

const sortStyles: StylesConfig = {
  control: (styles) => ({ ...styles, backgroundColor: 'var(--foreground)', color: 'var(--text-dark)', cursor: `pointer`, zIndex: "1" }),
  option: (styles) => ({ ...styles, backgroundColor: 'var(--foreground)', color: 'var(--text-dark)', cursor: `pointer`, zindex: "1" }),
  input: (styles) => ({ ...styles }),
  placeholder: (styles) => ({ ...styles }),
  singleValue: (styles, { data }) => ({ ...styles }),
};

function ForumPage() {
  const params = useParams();
  const [forum, setForum] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  // Only run after the component has mounted on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch forum data when client is loaded and params are available
  useEffect(() => {
    if (isClient && params.forumID) {
      const foundForum = data.find((frm) => frm.id === params.forumID);
      setForum(foundForum);
    }
  }, [isClient, params.forumID]);

  // Ensure the component only renders on the client
  if (!isClient || !forum) {
    return null;
  }

  // Sort the threads by the date in descending order (most recent first)
  const sortedThreads = forum.threads.sort((a: any, b: any) => {
    // Assuming threads have a 'date' field in a recognizable format, such as ISO 8601
    const dateA = new Date(a.datePosted).getTime();
    const dateB = new Date(b.datePosted).getTime();
    return dateB - dateA; // Sort by descending date
  });

  return (
    <main className={styles.forumPage}>
      <Navbar />
      <Banner />
      <section className={styles.threadsPosts}>
        <LatestPosts />
        <section className={styles.threads}>
          <section className={styles.top}>
            <h3>{forum.name}</h3>
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={sortOptions[0]}
              isDisabled={false}
              isLoading={false}
              isClearable={false}
              isRtl={false}
              isSearchable={false}
              name="sort"
              options={sortOptions}
              styles={sortStyles}
            />
          </section>
          <section className={styles.list}>
            {
              sortedThreads.map((thread: any) => {
                return <ForumPost post={thread} forumId={forum.id} key={thread.id} />;
              })
            }
          </section>
        </section>
      </section>
    </main>
  );
}

export default ForumPage;
