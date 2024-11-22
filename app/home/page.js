"use client";

import { useSession, signIn, signOut } from 'next-auth/react'; // Import NextAuth for session management
import { useState, useEffect } from 'react';                   // Import React hooks
import axios from 'axios';                                     // Import Axios for HTTP requests
import TaskList from '../components/TaskList'; 
import AuthForm from '../components/AuthForm'; 
import styles from './home.module.css'; 
import Link from 'next/link';
import { faArrowRightFromBracket, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// Home component for managing tasks and user authentication
export default function Home() {
  const { data: session, status } = useSession();            // Manage session state
  const [tasks, setTasks] = useState([]);                    // State to store tasks
  const [email, setEmail] = useState('');                    // State to manage email input
  const [password, setPassword] = useState('');              // State to manage password input
  const [isRegistering, setIsRegistering] = useState(false); // State to toggle between register and sign-in modes
  const [editingTask, setEditingTask] = useState(null);      // State to manage the task currently being edited


  useEffect(() => {                                   // Fetch tasks when the user is authenticated
    if (status === 'authenticated') {
      axios.get('/api/tasks', {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`
        }
      })
        .then((response) => setTasks(response.data))
        .catch((error) => console.error('Error fetching tasks:', error));
    }
  }, [status, session]);

  const handleAuth = async (e) => {                  // Handle user authentication (register or sign-in) 
    e.preventDefault();
    if (isRegistering) {
      try {
        await axios.post('/api/auth/register', { email, password });
        alert('User registered successfully! Now you can sign in.');

        signIn('credentials', { email, password, redirect: false }).then(({ error }) => {
          if (error) {
            alert('Sign in failed. Please check your credentials.');
          }
        });

        setIsRegistering(false);
      } catch (error) {
        alert('Registration failed: ' + error.response.data.message);
      }
    } else {
      try {
        const result = await signIn('credentials', { email, password, redirect: false });

        if (result.error) {
          alert('Sign in failed. Please check your credentials.');
        }
      } catch (error) {
        console.error('Error signing in:', error);
        alert('Error signing in.');
      }
    }
  };


  const handleDelete = async (taskId) => {       // Handle task deletion
    if (status === 'authenticated') {
      try {
        await axios.delete('/api/tasks', {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`
          },
          data: { taskId }
        });
        setTasks(tasks.filter(task => task.id !== taskId)); // Remove deleted task from list
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('An error occurred while deleting the task.');
      }
    }
  };

  const toggleAuthMode = () => {             // Toggle between registration and sign-in modes
    setIsRegistering(!isRegistering);
  };

  const handleSignOut = async () => {
    // Llamamos a signOut y esperamos a que termine el cierre de sesión
    await signOut({ redirect: false });

    // Luego redirigimos al usuario a la página de inicio
    router.push('/home'); // Redirige a la página de inicio
  };

  return (
    <>
      {status === 'authenticated' ? (
        // User is authenticated: Show task management components
        <div className={styles.containerHome}>
          <div className={styles.cA}>
            <h2 className={styles.titleHome}></h2>
            <TaskList tasks={tasks} handleEdit={setEditingTask} handleDelete={handleDelete} />
          </div>
          <div className={styles.cB}>
            <Link href='/addTask'>
            <button className={styles.buttonOptions}><FontAwesomeIcon icon={faPlus}/></button>
            </Link>
            <button className={styles.buttonOptions} onClick={handleSignOut}><FontAwesomeIcon icon={faArrowRightFromBracket}/></button>
          </div>
        </div>
      ) : (
        // User is not authenticated: Show authentication form outside of containerHome
        <div className={styles.authContainer}>
          <AuthForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            handleAuth={handleAuth}
            isRegistering={isRegistering}
            toggleAuthMode={toggleAuthMode}
          />
        </div>
      )}
    </>
  );
}