"use client"

import React from 'react'
import { useRouter } from 'next/navigation';
import styles from "@/styles/components/ForumDiscussion.module.scss";
import { IoChatbox } from "react-icons/io5";

function ForumDiscussion({ forum }: {forum: any}) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/${forum.id}`);
  }

  return (
    <section className={styles.forumDiscussion}  onClick={handleClick}>
      <section className={styles.left}>
        <IoChatbox />
        <section className={styles.info}>
          <h3>{forum.name}</h3>
          <p>{forum.description}</p>
        </section>
      </section>
      <section className={styles.right}>
        <div className={styles.threads}>
          <IoChatbox />
          <p>{forum.threads.length}</p>
        </div>
      </section>
    </section>
  )
}

export default ForumDiscussion
