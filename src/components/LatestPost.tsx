import React from 'react'
import styles from "@/styles/components/LatestPost.module.scss";
import Link from 'next/link';

function LatestPost({ post } : { post: any}) {
  return (
    <section className={styles.latestPost}>
      <img src={"https://cdn.theathletic.com/app/uploads/2023/07/15164210/Messi_Miami-scaled-e1689453796856.jpg"} alt="messi" />
      <div className={styles.content}>
        <h3>{post.title}</h3>
        <div className={styles.userInfo}>
          <p>{post.owner.username}</p>
          <div className={styles.seperator} />
          <p>{new Date(post.datePosted).toDateString()}</p>
        </div>
        <Link href={`${post.forumId}`}>{post.forumName}</Link>
      </div>
    </section>
  )
}

export default LatestPost