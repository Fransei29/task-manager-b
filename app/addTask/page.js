'use client';

import React, { useState } from 'react';
import TaskForm from '../components/TaskForm'; // Ajusta la ruta si es necesario
import { useSession } from 'next-auth/react'; // Para la autenticación
import axios from 'axios';                    // Para las peticiones HTTP
import styles from './addTask.module.css';
import 'react-datepicker/dist/react-datepicker.css';

const AddTaskPage = () => {
  const { data: session, status } = useSession(); // Obtiene la sesión del usuario
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTask, setEditingTask] = useState(null); // Estado para edición de tareas
  const [tasks, setTasks] = useState([]);               // Lista de tareas
  const [dueDate, setDueDate] = useState(new Date());  // Inicializa dueDate como objeto Date

  // Manejar la creación o edición de la tarea
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'authenticated') {                 // Verifica si el usuario está autenticado
      try {
        if (editingTask) {                             // Actualiza tarea existente
          const response = await axios.put('/api/tasks', {
            id: editingTask.id,
            newTitle: title,
            newDescription: description,
            dueDate, // Incluye la fecha de vencimiento al actualizar
          }, {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`
            }
          });
          setTasks(tasks.map(task => task.id === editingTask.id ? response.data : task));
          setEditingTask(null);                       // Limpia el estado de edición
        } else {                                      // Crea una nueva tarea
          const response = await axios.post('/api/tasks', { title, description, dueDate }, {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`
            }
          });
          setTasks([...tasks, response.data]);         // Agrega nueva tarea a la lista
        }

        // Limpia los campos de entrada
        setTitle('');                                  
        setDescription('');
        setDueDate(new Date()); // Reinicia la fecha de vencimiento
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
      <h1 className={styles.titleAdd}>Add New Task</h1>
      <TaskForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        handleSubmit={handleSubmit}
        editingTask={editingTask}
        dueDate={dueDate} // Pasar el estado de la fecha al componente
        setDueDate={setDueDate} // Pasar el setter para la fecha
      />
    </div>
  );
};

export default AddTaskPage;
