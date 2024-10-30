'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css'

const Header = () => {
  const { data: session, status } = useSession(); // Verifica si el usuario está autenticado

  return (
    <header className={styles.header}>
      <h1 className={styles.logoText}>
        Task<span style={{ color: "#fed36a" }}>Fra</span>
      </h1>
      
      {/* Solo muestra la barra de navegación si el usuario está autenticado */}
      {status === 'authenticated' && (
        <nav className={styles.navbar}>
          <ul>
          <li>
              <Link href="/home">Home</Link>
            </li>
            <li>
              <Link href="/addTask">Add Task</Link>
            </li>
            <li>
              <Link href="/logout">Logout</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
