// components/TaskForm.js
import React from 'react';
import styles from '../app/page.module.css'; // Import CSS module

const TaskForm = ({ title, setTitle, description, setDescription, handleSubmit, editingTask }) => {
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Name"
        required
        className={styles.input}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className={styles.textarea}
      />
      <button type="submit" className={styles.button}>
        {editingTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
