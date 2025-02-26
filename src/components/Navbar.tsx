"use client"

import React, { useState } from 'react';
import styles from "@/styles/components/Navbar.module.scss";
import Searchbar from './Searchbar';
import { IoIosMenu } from "react-icons/io";
import MobileMenu from './MobileMenu';
import Link from 'next/link';
import SignIn from './modals/SignIn';
import Register from './modals/Register';
import { usePathname } from 'next/navigation';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [signInOpen, setSignInOpen] = useState<boolean>(false);
  const [registerOpen, setRegisterOpen] = useState<boolean>(false);

  const pathname = usePathname();
  const isActive = (path: string) => pathname.includes(path);

  return (
    <section className={styles.navbar}>
      <section className={styles.container}>
        <SignIn 
          open={signInOpen} 
          handleClose={() => setSignInOpen(false)} 
          handleOpenRegister={() => {
            setSignInOpen(false);
            setRegisterOpen(true);
          }}
        />
        <Register 
          open={registerOpen} 
          handleClose={() => setRegisterOpen(false)} 
          handleOpenSignIn={() => {
            setRegisterOpen(false);
            setSignInOpen(true);
          }}
        />
        <MobileMenu open={mobileMenuOpen} close={() => setMobileMenuOpen(false)} />
        <ul className={styles.links}>
          <li>
            <Link 
              href="/" 
              className={isActive('new-posts') ? styles.inactive : styles.active}
            >
              Forums
            </Link>
          </li> 
          <li>
            <Link 
              href="/new-posts" 
              className={isActive('new-posts') ? styles.active : styles.inactive}
            >
              New Posts
            </Link>
          </li> 
        </ul>
        <section className={styles.right}>
          <Searchbar />
          <section className={styles.buttons}>
            <button className={styles.signIn} onClick={() => setSignInOpen(true)}>Sign in</button>
            <button className={styles.register} onClick={() => setRegisterOpen(true)}>Register</button>
          </section>
        </section>
        <IoIosMenu onClick={() => setMobileMenuOpen(true)} className={styles.mobileMenu} />
      </section>
    </section>
  );
}

export default Navbar;