"use client"

import { useState, useEffect } from "react";

import Image from "next/image";
import styles from "@/styles/NewPosts.module.scss";
import Banner from "@/components/Banner";
import LatestPosts from "@/components/LatestPosts";
import ForumDiscussion from "@/components/ForumDiscussion";
import ForumPost from "@/components/ForumPost";

import data from "../../../public/data/forums.json";

export default function NewPosts() {

  const [posts, setPosts] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  // Only run after the component has mounted on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch forum data when client is loaded and params are available
  useEffect(() => {
    if (isClient) {
      const postsArray = data.map(forum => forum.threads.map(thread => {return {...thread, forumId: forum.id, forumName: forum.name}})).flat();

      postsArray.sort((post1, post2) => 
        {
          if(post1.datePosted < post2.datePosted) {
            return 1;
          } else if (post1.datePosted > post2.datePosted) {
            return -1;
          } else {
            return 0;
          }

        });
      setPosts(postsArray);
    }
  }, [isClient]);

  // Ensure the component only renders on the client
  if (!isClient || !posts) {
    return <div>Loading...</div>
  }

  return (
    <main className={styles.newPosts}>
      <Banner />
        <section className={styles.posts}>
          {
            posts.map((post: any) => {
              return <ForumPost post={post} includeForum={true} forumId={post.forumId} key={post.id} />
            })
          }
        </section>
    </main>
  );
}
