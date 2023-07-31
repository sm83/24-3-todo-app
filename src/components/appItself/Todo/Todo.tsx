import styles from './Todo.module.css';

import { TodoElementInterface } from '../../../interfaces/TodoElement.interface';

import TodoDoneBtn from './TodoDoneBtn/TodoDoneBtn';
import TodoDeleteBtn from './TodoDeleteBtn/TodoDeleteBtn';

const todoNameDefault = `${styles.todoNameArea}`;
const todoNameGreen = `${styles.todoNameArea} ${styles.greenModifier}`;

const Todo = ({ todoElement }: { todoElement: TodoElementInterface }) => {
  let todoNameArea;
  let deleteBtnVisible;

  if (!todoElement.done) {
    todoNameArea = todoNameDefault;
    deleteBtnVisible = true;
  } else {
    todoNameArea = todoNameGreen;
    deleteBtnVisible = false;
  }

  // console.log(todoElement);
  return (
    <>
      <div className={styles.todoBlock}>
        <div className={todoNameArea}>
          <div className={styles.todoName}>{todoElement.name}</div>
          <TodoDoneBtn uniqueIdPass={todoElement.uniqueId} />
          <TodoDeleteBtn
            uniqueId={todoElement.uniqueId}
            visiblePass={deleteBtnVisible}
          />
        </div>
        <div className={styles.todoDescriptionArea}>
          <div className={styles.todoDescription}>
            {todoElement.description}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
