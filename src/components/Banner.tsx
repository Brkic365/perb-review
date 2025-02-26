"use client"

import React, { useState } from 'react'
import styles from "@/styles/components/Banner.module.scss";
import Register from './modals/Register';
import SignIn from './modals/SignIn';

function Banner() {
  
  const [signInOpen, setSignInOpen] = useState<boolean>(false);
  const [registerOpen, setRegisterOpen] = useState<boolean>(false);
  
  return (
    <section className={styles.banner}>
      <SignIn open={signInOpen} handleClose={() => setSignInOpen(false)} handleOpenRegister={() => {
        setSignInOpen(false);
        setRegisterOpen(true);
      }}/>
      <Register open={registerOpen} handleClose={() => setRegisterOpen(false)} handleOpenSignIn={() => {
        setRegisterOpen(false);
        setSignInOpen(true);
      }}/>
        <h1>Want to Join One of the Largest Canada Adult Community?</h1>
        <button onClick={() => setRegisterOpen(true)}>Sign Up</button>
    </section>
  )
}

export default Banner