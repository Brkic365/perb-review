"use client";

import React, { useState, useEffect } from 'react';
import styles from "@/styles/components/ForumPost.module.scss";
import { IoChatbox, IoHeart } from "react-icons/io5";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

function ForumPost({ post, forumId, includeForum = false }: { post: any, forumId: string, includeForum?: boolean }) {
  const router = useRouter();
  
  const handleClick = () => {
    router.push(`${forumId}/${post.id}`);
  }

  return (
    <section className={styles.forumPost} onClick={handleClick}>
      <section className={styles.left}>
        <img src={"https://cdn.theathletic.com/app/uploads/2023/07/15164210/Messi_Miami-scaled-e1689453796856.jpg"} alt="messi" />
        <section className={styles.info}>
          <h3>{post.title}</h3>
          <div className={styles.userInfo}>
            <p>{post.owner.username}</p>
            <div className={styles.seperator} />
            <p>{format(new Date(post.datePosted), 'MMM dd, yyyy')}</p>
            {includeForum && (
              <>
                <div className={styles.seperator} />
                <Link href={`${forumId}`}>{post.forumName}</Link>
              </>
            )}
          </div>
        </section>
      </section>
      <section className={styles.right}>
        <div className={styles.likes}>
          <IoHeart />
          <p>{post.likes}</p>
        </div>
        <div className={styles.threads}>
          <IoChatbox />
          <p>{post.replies}</p>
        </div>
      </section>
    </section>
  );
}

export default ForumPost;
