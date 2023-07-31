import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';

import styles from './ColumnForm.module.css';
import { addColumn } from '../../../store/columnSlice';

const ColumnForm = () => {
  const [newColumnName, setNewColumnName] = useState('');

  const dispatch = useAppDispatch();

  const columnsLocal = useAppSelector((state) => state.columns.list);

  //generates unique id for new todo
  const genUniqueId = () => {
    const maxValue: number = 2048;

    let generated: boolean = false;
    let newId: number = 0;

    while (!generated) {
      newId = Math.floor(Math.random() * maxValue);
      for (let i = 0; i < columnsLocal.length; i++) {
        if (columnsLocal[i].columnId == newId) {
          break;
        }
        generated = true;
      }
    }

    return newId;
  };

  const newId = genUniqueId();

  const handleNewColumn = (event: any) => {
    event.preventDefault();

    dispatch(
      addColumn({
        name: newColumnName,
        columnId: newId,
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
