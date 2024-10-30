// Calendar.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Calendar.module.css';
import '../globals.css'

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className={styles.calendarContainer}>
      <DatePicker 
        selected={startDate} 
        onChange={(date) => setStartDate(date)} 
        className={styles.datePicker}
      />
    </div>
  );
};

export default Calendar;

