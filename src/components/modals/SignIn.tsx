"use client"

import React, { useState, useEffect } from 'react'
import styles from "@/styles/components/modals/SignIn.module.scss";
import Modal from '@mui/material/Modal';
import Link from 'next/link';
import {IoClose} from "react-icons/io5";
import { IoMailOutline, IoLockClosedOutline } from "react-icons/io5";
import FormError from './FormError';

function SignIn({open, handleClose, handleOpenRegister}: {open: boolean, handleClose: () => void, handleOpenRegister: () => void}) {

  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setError("Invalid Email or Password");
  }

  useEffect(() => {
    setError(null);
  }, [open])
  
  return (
    <div className={styles.signInContainer}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <section className={styles.signIn}>
          <IoClose className={styles.close} onClick={handleClose} />
          <h3>Sign in with email</h3>
          <p>Join One of the Largest Canada Adult Communities</p>
          <form onSubmit={handleSubmit}>
            <section className={styles.input}>
              <IoMailOutline />
              <input placeholder="Email" type='email' />
            </section>
            <section className={styles.input}>
              <IoLockClosedOutline />
              <input placeholder='Password'type="password" />
            </section>
            {
              error && <FormError message={error} />
            }
            <button type="submit">Get Started</button>
          </form>
          <p className={styles.ctaText}>Don't have an account? <span onClick={handleOpenRegister}>Register here</span></p>
        </section>
      </Modal>
    </div>
  )
}

export default SignIn