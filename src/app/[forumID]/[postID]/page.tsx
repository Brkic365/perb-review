"use client"

import React, { useState, useEffect } from 'react'
import styles from "@/styles/PostPage.module.scss"
import Banner from '@/components/Banner'
import LatestPosts from '@/components/LatestPosts'
import ForumPost from '@/components/ForumPost'
import { FiPlus } from "react-icons/fi";
import Link from 'next/link'
import ThreadPost from '@/components/ThreadPost'
import { format } from 'date-fns';

import { useParams } from 'next/navigation';

import data from "../../../../public/data/forums.json";

import Register from '@/components/modals/Register';
import SignIn from '@/components/modals/SignIn'

function PostPage() {
  const params = useParams();

  const [signInOpen, setSignInOpen] = useState<boolean>(false);
  const [registerOpen, setRegisterOpen] = useState<boolean>(false);
  const [forum, setForum] = useState<any>(null);
  const [thread, setThread] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  // Only run after the component has mounted on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch forum data when client is loaded and params are available
  useEffect(() => {
    if (isClient && params.forumID && params.postID) {
      const foundForum = data.find((frm) => frm.id === params.forumID);
      setForum(foundForum);
      const foundThread = foundForum?.threads.find((thrd) => thrd.id === params.postID);
      setThread(foundThread);
    }
  }, [isClient, params.forumID, params.postID]);

  // Ensure the component only renders on the client
  if (!isClient || !forum || !thread) {
    return <div>Loading...</div>
  }

  return (
    <main className={styles.postPage}>
      <SignIn open={signInOpen} handleClose={() => setSignInOpen(false)} handleOpenRegister={() => {
        setSignInOpen(false);
        setRegisterOpen(true);
      }}/>
      <Register open={registerOpen} handleClose={() => setRegisterOpen(false)} handleOpenSignIn={() => {
        setRegisterOpen(false);
        setSignInOpen(true);
      }}/>
      <Banner />
      <section className={styles.threadsPosts}>
        <LatestPosts />
        <section className={styles.threads}>
          <section className={styles.top}>
            <section className={styles.left}>
              <h2>{thread.title}</h2>
              <div className={styles.userInfo}>
                <p>{thread.owner.username}</p>
                <div className={styles.seperator} />
                <p>{format(new Date(thread.datePosted), 'MMM dd, yyyy')}</p>
              </div>
              <Link href={`/${forum.id}`}>
                Forums / {forum.name}
              </Link>
            </section>
            <button onClick={() => setSignInOpen(true)}>
              <FiPlus />
              <p>Comment</p>
            </button>
          </section>
          <section className={styles.list}>
            {thread.posts.map((post: any) => {
              return <ThreadPost post={post} posts={thread.posts} key={post.id} />
            })}
          </section>
        </section>
      </section>
    </main>
  )
}

export default PostPage