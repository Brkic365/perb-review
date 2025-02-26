"use client"

import React, { useState } from 'react'
import styles from "@/styles/components/Searchbar.module.scss";
import { IoSearch } from "react-icons/io5";

function Searchbar() {

  const [search, setSearch] = useState("");

  const handleKeyEnter = () => {
    
  }

  return (
    <section className={styles.searchbar}>
      <IoSearch />
      <input placeholder="Search..." onChange={(e) => setSearch(e.target.value)} onClick={handleKeyEnter} />
    </section>
  )
}

export default Searchbar