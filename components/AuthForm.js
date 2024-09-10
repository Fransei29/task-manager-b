import React from 'react';
import styles from '../app/page.module.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

// AuthForm component for user authentication (register or sign in)
const AuthForm = ({ email, password, setEmail, setPassword, handleAuth, isRegistering, toggleAuthMode }) => {
  return (
    <div className={styles.authContainer}>
      <h1 className={styles.titleA}>Welcome to Task Manager</h1>             {/* Title and introductory text */}
      <p className={styles.welcomeText}>Organize your tasks efficiently and achieve your goals.</p>
      <form onSubmit={handleAuth} className={styles.formA}>                  {/* Authentication form */}
        <div className={styles.inputGroup}>
          <FontAwesomeIcon icon={faEnvelope} className={styles.inputIcon} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <FontAwesomeIcon icon={faLock} className={styles.inputIcon} />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.buttonA}>                   {/* Submit button for registration or sign-in */}
          {isRegistering ? 'Register' : 'Sign In'}
        </button>
        <button type="button" onClick={toggleAuthMode} className={styles.buttonA}> {/* Toggle button to switch between registration and sign-in modes */}
          {isRegistering ? 'Go to Sign In' : 'Create an Account'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;

