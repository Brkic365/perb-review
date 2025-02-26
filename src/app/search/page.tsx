"use client";

import React, { useState, useEffect } from 'react';
import styles from "@/styles/ForumPage.module.scss";
import Banner from '@/components/Banner';
import LatestPosts from '@/components/LatestPosts';
import ForumPost from '@/components/ForumPost';

import { useSearchParams } from 'next/navigation'

import { Suspense } from 'react'

function Search() {
  const [isClient, setIsClient] = useState(false);

  // Only run after the component has mounted on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch forum data when client is loaded and params are available
  useEffect(() => {
  }, [isClient]);

  // Ensure the component only renders on the client
  if (!isClient) {
    return null;
  }

  return (
    <main className={styles.forumPage}>
      <Banner />
      <section className={styles.threadsPosts}>
        <LatestPosts />
        <section className={styles.threads}>
          <section className={styles.top}>
            <h3>Search: {}</h3>
          </section>
          <section className={styles.list}>
          </section>
        </section>
      </section>
    </main>
  );
}

export default Search;
