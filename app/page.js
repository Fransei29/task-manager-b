// app/page.js
"use client";

import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import AuthForm from '../components/AuthForm';
import styles from '../app/page.module.css'; // Import CSS module

export default function Home() {
  const { data: session, status } = useSession(); // Manage session
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
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

  const handleAuth = async (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'authenticated') {
      try {
        if (editingTask) {
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
          setEditingTask(null);
        } else {
          const response = await axios.post('/api/tasks', { title, description }, {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`
            }
          });
          setTasks([...tasks, response.data]);
        }

        setTitle('');
        setDescription('');
      } catch (error) {
        console.error('Error creating or updating task:', error);
        alert('An error occurred while creating or updating the task.');
      }
    } else {
      alert('You must be signed in to create or update a task.');
    }
  };

  const handleDelete = async (taskId) => {
    if (status === 'authenticated') {
      try {
        await axios.delete('/api/tasks', {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`
          },
          data: { taskId }
        });
        setTasks(tasks.filter(task => task.id !== taskId));
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('An error occurred while deleting the task.');
      }
    }
  };

  const toggleAuthMode = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className={styles.container}>
      {status === 'authenticated' ? (
        <>
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
