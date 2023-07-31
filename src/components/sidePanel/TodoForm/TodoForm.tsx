import { useState } from 'react';
import { useAppDispatch } from '../../../hooks';
import { useAppSelector } from '../../../hooks';

import SelectColumnList from './SelectColumnList';

import styles from './TodoForm.module.css';
import { addTodo } from '../../../store/todoSlice';

const TodoForm = () => {
  const [newTodoElementName, setNewTodoElementName] = useState<string>('');
  const [newTodoElementDesc, setNewTodoElementDesc] = useState<string>('');
  const [todoColumnId, setTodoColumnId] = useState<number>(0);

  const dispatch = useAppDispatch();

  const todosLocal = useAppSelector((state) => state.todos.list);

  //generates unique id for new todo
  const genUniqueId = () => {
    const maxValue: number = 2048;

    let generated: boolean = false;
    let newId: number = 0;

    while (!generated) {
      newId = Math.floor(Math.random() * maxValue);
      for (let i = 0; i < todosLocal.length; i++) {
        if (todosLocal[i].uniqueId == newId) {
          break;
        }
        generated = true;
      }
    }

    return newId;
  };

  const newId = genUniqueId();

  const handleNewTodo = (event: any) => {
    event.preventDefault();

    dispatch(
      addTodo({
        name: newTodoElementName,
        description: newTodoElementDesc,
        columnId: todoColumnId,
        uniqueId: newId,
        done: false,
      })
    );

    setNewTodoElementName('');
    setNewTodoElementDesc('');
  };

  const handleInputName = (e: any) => {
    setNewTodoElementName(e.target.value);
  };

  const handleInputDesc = (e: any) => {
    setNewTodoElementDesc(e.target.value);
  };

  const handleInputColumn = (value: number) => {
    setTodoColumnId(value);
  };

  return (
    <div className={styles.todoFormArea}>
      <h1 className={styles.text1}>Add new task</h1>
      <div>
        <form className={styles.formBlock} onSubmit={handleNewTodo}>
          <div className={styles.inputsArea}>
            <label>
              <input
                className={styles.input}
                placeholder="Task name"
                type="text"
                value={newTodoElementName}
                onChange={(e) => handleInputName(e)}
              ></input>

              <textarea
                className={styles.input}
                placeholder="Description"
                value={newTodoElementDesc}
                onChange={(e) => handleInputDesc(e)}
              ></textarea>

              <SelectColumnList handleInputColumn={handleInputColumn} />
            </label>
          </div>

          <button className={styles.button} onClick={genUniqueId} type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
