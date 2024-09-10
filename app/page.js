"use client";

import { useSession, signIn, signOut } from 'next-auth/react'; // Import NextAuth for session management
import { useState, useEffect } from 'react';                   // Import React hooks
import axios from 'axios';                                     // Import Axios for HTTP requests
import TaskForm from '../components/TaskForm'; 
import TaskList from '../components/TaskList'; 
import AuthForm from '../components/AuthForm'; 
import styles from '../app/page.module.css'; 

// Home component for managing tasks and user authentication
export default function Home() {
  const { data: session, status } = useSession();            // Manage session state
  const [tasks, setTasks] = useState([]);                    // State to store tasks
  const [title, setTitle] = useState('');                    // State to manage task title input
  const [description, setDescription] = useState('');        // State to manage task description input
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

  const handleSubmit = async (e) => {              // Handle task creation or update
    e.preventDefault();
    if (status === 'authenticated') {
      try {
        if (editingTask) {                         // Update existing task
          const response = await axios.put('/api/tasks', {
            id: editingTask.id,
            newTitle: title,
            newDescription: description,
          }, {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`
            }
          });
          setTasks(tasks.map(task => task.id === editingTask.id ? response.data : task));
          setEditingTask(null);                  // Clear editing state after update
        } else {                                 // Create new task
          const response = await axios.post('/api/tasks', { title, description }, {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`
            }
          });
          setTasks([...tasks, response.data]);  // Add new task to list
        }

        setTitle('');                           // Clear input fields
        setDescription('');
      } catch (error) {
        console.error('Error creating or updating task:', error);
        alert('An error occurred while creating or updating the task.');
      }
    } else {
      alert('You must be signed in to create or update a task.');
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

  return (
    <div className={styles.container}>
      {status === 'authenticated' ? (
        <>
          {/* User is authenticated: Show task management components */}
          <h1 className={styles.title}>Manage your tasks!</h1>
          <TaskForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            handleSubmit={handleSubmit}
            editingTask={editingTask}
          />
          <TaskList tasks={tasks} handleEdit={setEditingTask} handleDelete={handleDelete} />
          <button onClick={() => signOut()} className={styles.buttonSignOut}>Sign Out</button>
        </>
      ) : (
        // User is not authenticated: Show authentication form
        <AuthForm
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          handleAuth={handleAuth}
          isRegistering={isRegistering}
          toggleAuthMode={toggleAuthMode}
        />
      )}
    </div>
  );
}
