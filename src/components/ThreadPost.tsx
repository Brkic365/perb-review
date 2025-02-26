"use client";

import React, { useState, useEffect } from 'react';
import styles from "@/styles/components/ThreadPost.module.scss";
import { IoChatbox, IoHeart } from "react-icons/io5";
import { FaReply } from "react-icons/fa";
import Image from 'next/image';
import { format } from 'date-fns';

import Register from './modals/Register';
import SignIn from './modals/SignIn';


function ThreadPost({ post, posts }: { post: any, posts: any }) {

  const [signInOpen, setSignInOpen] = useState<boolean>(false);
  const [registerOpen, setRegisterOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);
  const [replyingPost, setReplyingPost] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    setReplyingPost(posts.find((pst: { id: any; }) => pst.id === post.repliesTo));
  }, [isClient])
  

  if (!isClient && (post.repliesTo && !replyingPost)) {
    return <div>Loading...</div>; // Placeholder for server render
  }

  console.log(post.repliesTo, replyingPost)

  return (
    <section className={styles.threadPost}>
      <SignIn open={signInOpen} handleClose={() => setSignInOpen(false)} handleOpenRegister={() => {
        setSignInOpen(false);
        setRegisterOpen(true);
      }}/>
      <Register open={registerOpen} handleClose={() => setRegisterOpen(false)} handleOpenSignIn={() => {
        setRegisterOpen(false);
        setSignInOpen(true);
      }}/>
      <section className={styles.user}>
        <Image
          src=""
          alt="messi"
          width={50}
          height={50}
        />
        <section className={styles.info}>
          <h4>{post.user.username}</h4>
          <p>{format(new Date(post.datePosted), 'MMM dd, yyyy')}</p>
        </section>
      </section>
      <section className={styles.content}>
        {replyingPost && (
          <section className={styles.replyingPost}>
            <h3>{replyingPost.user.username} said:</h3>
            <p>{replyingPost.text}</p>
          </section>
        )}
        <p>{post.text}</p>
      </section>
      <section className={styles.buttons}>
        <div className={styles.likes} onClick={() => setSignInOpen(true)}>
          <IoHeart />
          <p>{post.likes}</p>
        </div>
        <div className={styles.reply} onClick={() => setSignInOpen(true)}>
          <FaReply />
          <p>Reply</p>
        </div>
      </section>
    </section>
  );
}

export default ThreadPost;