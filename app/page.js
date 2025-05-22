'use client';

import Image from "next/image";
import styles from "../app/page.module.css";
import './globals.css'
import { useRouter } from 'next/navigation';

function Welcome() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/home'); 
  };

  return (
    <main className={styles.splash}>
    <div className={styles.grid}>
      <div className={styles.textColumn}>
        <h1 className={styles.title}>
          Task<span className={styles.highlight}>Fra</span> <br />
        </h1>
        <p className={styles.subtitleA}>
          Manage your tasks 
        </p>
        <p className={styles.subtitle}>
          Simple. Fast. Reliable.
        </p>
        <button className={styles.startButton} onClick={handleStart}>
          Let’s Start 
        </button>
      </div>
  
      <div className={styles.imageColumn}>
        <Image
          className={styles.heroImage}
          src="/banner.svg"
          width={150}
          height={150}
          alt="Task manager illustration"
        />
      </div>
    </div>
  </main>
  
  );
}

export default Welcome;