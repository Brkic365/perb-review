"use client"

import React, { useState, useEffect } from 'react'
import styles from "@/styles/components/LatestPosts.module.scss";
import LatestPost from './LatestPost';

import data from "../../public/data/forums.json";

function LatestPosts() {

  
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
    <section className={styles.latestPosts}>
      <p>Latest Posts</p>
      <div className={styles.posts}>
        {posts.slice(0, 5).map((post: any) => {
          return <LatestPost post={post} key={post.id} />
        })}
      </div>
    </section>
  )
}

export default LatestPosts