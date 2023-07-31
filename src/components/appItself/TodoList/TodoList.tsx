import { TodoElementInterface } from '../../../interfaces/TodoElement.interface';

import Todo from '../Todo/Todo';

import styles from './TodoList.module.css';

const TodoList = ({
  todoListPass,
}: {
  todoListPass: TodoElementInterface[];
}) => {
  if (todoListPass.length == 0) {
    return <div className={styles.noTask}>No active tasks, bro!</div>;
  } else {
    return (
      <div className={styles.todosContainerBackground}>
        <div className={styles.todosContainer}>
          {todoListPass.map((todoObject, index) => (
            <Todo key={index} todoElement={todoObject} />
          ))}
        </div>
      </div>
    );
  }
};

export default TodoList;
