import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import Banner from "@/components/Banner";
import LatestPosts from "@/components/LatestPosts";
import ForumDiscussion from "@/components/ForumDiscussion";

import data from "../../public/data/forums.json";

export default function Home() {
  return (
    <main className={styles.home}>
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
