"use client"

import React, {useState, useEffect } from 'react'
import styles from "@/styles/components/modals/Register.module.scss";
import Modal from '@mui/material/Modal';
import Link from 'next/link';
import {IoClose} from "react-icons/io5";
import { IoMailOutline, IoLockClosedOutline, IoPersonOutline  } from "react-icons/io5";

import FormError from './FormError';

function Register({open, handleClose, handleOpenSignIn}: {open: boolean, handleClose: () => void, handleOpenSignIn: () => void}) {

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
    
  const handleSubmit = (e: any) => {
    e.preventDefault();

    if(username == "" || email == "" || password == "" || repeatPassword == "") {
      setError("All fields are required.");
      return;
    }

    if(password.length < 8) {
      setError("Password needs to be atleast 8 characters long.");
      return;
    }

    if(password !== repeatPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSuccess(true);
  }

  const close = () => {
    setSuccess(false);
    handleClose();
  }

  useEffect(() => {
    setError(null);
  }, [open])
  
  return (
    <div className={styles.registerContainer}>
      {
        success ? <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <section className={styles.confirmation}>
          <IoClose className={styles.close} onClick={close} />
          <h3>Success!</h3>
          <p style={{width: "100%"}}>We have successfully received your application and once it is approved you will be notified through email.</p>
          <button onClick={close}>Close</button>
        </section>
      </Modal> : <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <section className={styles.register}>
          <IoClose className={styles.close} onClick={handleClose} />
          <h3>Register with email</h3>
          <p>Join One of the Largest Canada Adult Communities</p>
          <form onSubmit={handleSubmit}>
            <section className={styles.input}>
              <IoPersonOutline />
              <input placeholder="Username" type='text' onChange={(e) => setUsername(e.target.value)} />
            </section>
            <section className={styles.input}>
              <IoMailOutline />
              <input placeholder="Email" type='email' onChange={(e) => setEmail(e.target.value)} />
            </section>
            <section className={styles.input}>
              <IoLockClosedOutline />
              <input placeholder='Password' type="password" onChange={(e) => setPassword(e.target.value)} />
            </section>
            <section className={styles.input}>
              <IoLockClosedOutline />
              <input placeholder='Repeat Password' type="password" onChange={(e) => setRepeatPassword(e.target.value)} />
            </section>
            {
              error && <FormError message={error} />
            }
            <button type="submit" >Get Started</button>
          </form>
          <p className={styles.ctaText}>Already have an account? <span onClick={handleOpenSignIn}>Sign in here</span></p>
        </section>
      </Modal>
      }
    </div>
  )
}

export default Register