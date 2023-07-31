import styles from './TodoDeleteBtn.module.css';

import trashbin from '/trashbin.png';

import { useAppDispatch } from '../../../../hooks';
import { deleteTodo } from '../../../../store/todoSlice';

const TodoDeleteBtn = ({
  uniqueId,
  visiblePass,
}: {
  uniqueId: number;
  visiblePass: boolean;
}) => {
  const dispatch = useAppDispatch();

  if (visiblePass) {
    return (
      <div
        className={styles.todoDeleteBtn}
        onClick={() => dispatch(deleteTodo(uniqueId))}
      >
        <img src={trashbin} className={styles.todoDelete}></img>
      </div>
    );
  } else {
    return null;
  }
};

export default TodoDeleteBtn;
