'use client';

import Image from "next/image";
import styles from "../app/page.module.css";
import './globals.css'
import { useRouter } from 'next/navigation';

function Welcome() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/home'); // Redirige a /app
  };

  return (
    <main className={styles.splash}>
      <div className={styles.container}>
        <section className={styles.mainContent}>
          <div className={styles.contentWrapper}>
            <div className={styles.textColumn}>
              <div className={styles.textContent}>
                <h1 className={styles.title}>
                  Manage <br /> your task<br /> with <br />
                  <span className={styles.highlightedText}>TaskFra</span>
                </h1>
                <button className="buttonStart" onClick={handleStart}>
                  Let’s Start
                </button>
              </div>
            </div>
            <div className={styles.imageColumn}>
              <Image 
                loading="lazy" 
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/807a7eba46563704515c12d4787cce9dc0c6198647c6466ee25d9ede65c632db?placeholderIfAbsent=true&apiKey=8499a29b5efb4b4bb3c249bc0f83b31a" 
                className={styles.featureImage} 
                alt="Task management illustration"
                width={300}
                height={450} 
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Welcome;