'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Cambia a usePathname en vez de useRouter
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.css';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const { data: session, status } = useSession(); // Verifica si el usuario está autenticado
  const pathname = usePathname(); // Obtén la ruta actual

  const handleSignOut = async () => {
    // Llamamos a signOut y esperamos a que termine el cierre de sesión
    await signOut({ redirect: false });

    // Luego redirigimos al usuario a la página de inicio
    router.push('/home'); // Redirige a la página de inicio
  };

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
              <li>
               <button className={styles.buttonOptions} onClick={handleSignOut}><FontAwesomeIcon className={styles.icon} icon={faArrowRightFromBracket}/>
                Log Out
               </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;