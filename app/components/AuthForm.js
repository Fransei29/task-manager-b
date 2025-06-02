import React from 'react';
import styles from '../home/home.module.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

// AuthForm component for user authentication (register or sign in)
const AuthForm = ({ email, password, setEmail, setPassword, handleAuth, isRegistering, toggleAuthMode }) => {
  return (
    <div className={styles.authContainer}>
      <h1 className={styles.titleA}>Welcome</h1>  
      <p className={styles.subtitleA}>To get started create an account or log in</p>            {/* Title and introductory text */}
      <form onSubmit={handleAuth} className={styles.formA}>                  {/* Authentication form */}
        <div className={styles.inputGroup}>
              <p>Your Email</p>
              <div className={styles.inputContainer}>
                <FontAwesomeIcon icon={faEnvelope} className={styles.inputIcon} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  required
                  className={styles.input}
                />
          </div>
        </div>
        <div className={styles.inputGroup}>
              <p>Your Password</p>
              <div className={styles.inputContainer}>
              <FontAwesomeIcon icon={faLock} className={styles.inputIcon} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={styles.input}
              />
        </div>
        </div>
        <button className={styles.buttonOptionsLog} type="submit">                   {/* Submit button for registration or sign-in */}
          {isRegistering ? 'Register' : 'Sign In'}
        </button>
        <button className={styles.buttonOptionsLog} type="button" onClick={toggleAuthMode}> {/* Toggle button to switch between registration and sign-in modes */}
          {isRegistering ? 'Go to Sign In' : 'Create an Account'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;

