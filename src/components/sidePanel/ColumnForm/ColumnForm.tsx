import { useState } from 'react';

import { useAppDispatch } from '../../../hooks';

import styles from './ColumnForm.module.css';
import { addColumn } from '../../../store/columnSlice';

const ColumnForm = () => {
  const [newColumnName, setNewColumnName] = useState('');

  const dispatch = useAppDispatch();

  const handleNewColumn = (event: any) => {
    event.preventDefault();

    dispatch(
      addColumn({
        name: newColumnName,
      })
    );
  };

  const handleInput = (e: any) => {
    setNewColumnName(e.target.value);
  };

  return (
    <form className={styles.columnFormBlock} onSubmit={handleNewColumn}>
      <label>
        <input
          placeholder="Enter new column name"
          className={styles.input}
          type="text"
          value={newColumnName}
          onChange={(e) => handleInput(e)}
        ></input>
      </label>

      <button className={styles.button} type="submit">
        Add
      </button>
    </form>
  );
};

export default ColumnForm;
