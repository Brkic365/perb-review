import Image from "next/image";
import styles from "@/styles/Forums.module.scss";
import Banner from "@/components/Banner";
import LatestPosts from "@/components/LatestPosts";
import ForumDiscussion from "@/components/ForumDiscussion";

import data from "../../../public/data/forums.json";

import Navbar from "@/components/Navbar";

export default function Forums() {
  return (
    <main className={styles.forumsPage}>
      <Navbar />
      <Banner />
      <section className={styles.forumsPosts}>
        <LatestPosts />
        <section className={styles.forums}>
          {
            data.map((forum) => {
              return <ForumDiscussion forum={forum} key={forum.id} />;
            })
          }
        </section>
      </section>
    </main>
  );
}
