'use client';

import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import styles from './addTask.module.css';
import 'react-datepicker/dist/react-datepicker.css';

const AddTaskPage = () => {
  const { data: session, status } = useSession();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [dueDate, setDueDate] = useState(new Date());

  useEffect(() => {
    const storedTask = localStorage.getItem('editingTask');
    if (storedTask) {
      const task = JSON.parse(storedTask);
      setTitle(task.title);
      setDescription(task.description);
      setEditingTask(task);
      setDueDate(new Date(task.dueDate || new Date()));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'authenticated') {
      try {
        if (editingTask) {
          const response = await axios.put('/api/tasks', {
            id: editingTask.id,
            newTitle: title,
            newDescription: description,
            dueDate,
          }, {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`
            }
          });
          setTasks(tasks.map(task => task.id === editingTask.id ? response.data : task));
          setEditingTask(null);
          localStorage.removeItem('editingTask'); // Limpia el localStorage
        } else {
          const response = await axios.post('/api/tasks', {
            title,
            description,
            dueDate,
          }, {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`
            }
          });
          setTasks([...tasks, response.data]);
        }

        setTitle('');
        setDescription('');
        setDueDate(new Date());
      } catch (error) {
        console.error('Error creando o actualizando tarea:', error);
        alert('Ocurrió un error al crear o actualizar la tarea.');
      }
    } else {
      alert('Debes estar autenticado para crear o actualizar una tarea.');
    }
  };

  return (
    <div className={styles.containerAdd}>
      <h1 className={styles.titleAdd}>
        {editingTask ? 'Edit Task' : 'Add New Task'}
      </h1>
      <TaskForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        handleSubmit={handleSubmit}
        editingTask={editingTask}
        dueDate={dueDate}
        setDueDate={setDueDate}
      />
    </div>
  );
};

export default AddTaskPage;
