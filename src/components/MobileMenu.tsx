import React, {useState} from 'react'
import styles from "@/styles/components/MobileMenu.module.scss";
import Link from 'next/link';
import { IoClose } from "react-icons/io5";
import SignIn from './modals/SignIn';
import Register from './modals/Register';

function MobileMenu({open, close} : {open: boolean, close: () => void}) {

  if(!open) return null;

  const [signInOpen, setSignInOpen] = useState<boolean>(false);
  const [registerOpen, setRegisterOpen] = useState<boolean>(false);

  return (
    <section className={styles.mobileMenu}>
      <SignIn open={signInOpen} handleClose={() => setSignInOpen(false)} handleOpenRegister={() => {
        setSignInOpen(false);
        setRegisterOpen(true);
      }}/>
      <Register open={registerOpen} handleClose={() => setRegisterOpen(false)} handleOpenSignIn={() => {
        setRegisterOpen(false);
        setSignInOpen(true);
      }}/>
      <IoClose className={styles.close} onClick={close}/>
      <section className={styles.links}>
        <Link href="/">Forums</Link>
        <Link href="/new-posts">New posts</Link>
      </section>
      <section className={styles.buttons}>
        <button className={styles.signIn} onClick={() => setSignInOpen(true)}>Sign in</button>
        <button className={styles.register} onClick={() => setRegisterOpen(true)}>Register</button>
      </section>
    </section>
  )
}

export default MobileMenu