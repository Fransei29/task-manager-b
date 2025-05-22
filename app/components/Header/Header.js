'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Cambia a usePathname en vez de useRouter
import styles from './Header.module.css';

const Header = () => {
  const { data: session, status } = useSession(); // Verifica si el usuario está autenticado
  const pathname = usePathname(); // Obtén la ruta actual

  return (
    <header className={styles.header}>
      <h1 className={styles.logoText}>
        Task<span style={{ color: "#e4a400" }}>Fra</span>
      </h1>
      
      {/* Solo muestra la barra de navegación si el usuario está autenticado */}
      {status === 'authenticated' && (
        <nav className={styles.navbar}>
          <ul>
            <li>
              <Link href="/home" className={pathname === '/home' ? styles.activeLink : ''}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/addTask" className={pathname === '/addTask' ? styles.activeLink : ''}>
                Add New Task
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;