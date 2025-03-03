"use client"

import styles from "@/styles/Home.module.scss";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  router.push("/forums");

  return (
    <main className={styles.home}>
      <h1>CANADA WIDE VIP MASSAGE AND ESCORT REVIEWS</h1>
      <button>
        Enter Site
      </button>
    </main>
  );
}
