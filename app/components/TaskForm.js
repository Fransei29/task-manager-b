import React from 'react';
import styles from '../addTask/addTask.module.css'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const TaskForm = ({ title, setTitle, description, setDescription, handleSubmit, dueDate, setDueDate }) => {
  return (
    <form onSubmit={handleSubmit} className={styles.taskForm}>
      <p className={styles.inputTitle}>Name</p>
      <input
        type="text"
        placeholder=""
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
        required
      />
      <p className={styles.inputTitle}>Description</p>
      <textarea
        placeholder=""
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.textarea}
        required
      />
      <p className={styles.inputTitle}>When?</p>
      <DatePicker 
        selected={dueDate} 
        onChange={(date) => setDueDate(date)} // Actualiza dueDate cuando se selecciona una nueva fecha
        className={styles.datePicker}
        dateFormat="yyyy-MM-dd" // Formato de fecha que puedes ajustar
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default TaskForm;
