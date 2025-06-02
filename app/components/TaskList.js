import React from 'react';
import styles from '../home/home.module.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import Font Awesome component
import { faEdit, faTimes } from '@fortawesome/free-regular-svg-icons'; 
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { BsCalendar3 } from 'react-icons/bs';

// TaskList component to display a list of tasks with edit and delete options
const TaskList = ({ tasks = [], handleEdit, handleDelete }) => {
  return (
    <>
    <h1 className={styles.titleList}>Your Tasks</h1>
    <ul className={styles.taskList}>                            {/* List of tasks */}
      {tasks.map((task) => (
        <li key={task.id} className={styles.task}>
          <div className={styles.taskContent}>
            <h3 className={styles.taskTitle}>{task.title}</h3> 
            <p>{task.description}</p>
          {task.dueDate && (
              <p className={styles.dueDate}>
                <BsCalendar3 style={{ marginRight: '10px', color: '#666', fontSize: '0.9rem' }} />
                {new Date(task.dueDate).toLocaleDateString()}
              </p>
            )}
          </div>
          <div className={styles.taskButtons}>                  {/* Buttons for editing and deleting tasks */}
            <button className={styles.editButton} onClick={() => handleEdit(task)}>
              <FontAwesomeIcon className={styles.iconA} icon={faEdit} />
            </button>
            <button className={styles.deleteButton} onClick={() => handleDelete(task.id)}>
              <FontAwesomeIcon className={styles.iconA} icon={faXmark} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  </>
  );
};

export default TaskList;
