import { ColumnElementInterface } from '../../../interfaces/ColumnElement.interface';
import TodoList from '../TodoList/TodoList';

import { useAppSelector } from '../../../hooks';

import styles from './Column.module.css';

const Column = ({
  columnElement,
}: {
  columnElement: ColumnElementInterface;
}) => {
  const AcceptedTodos = useAppSelector((state) => state.todos.list).filter(
    (todo) => todo.columnId == columnElement.columnId
  );

  return (
    <div className={styles.columnArea}>
      <div className={styles.columnNameArea}>
        <div className={styles.columnName}>{columnElement.name}</div>
      </div>
      <TodoList todoListPass={AcceptedTodos} />
    </div>
  );
};

export default Column;
