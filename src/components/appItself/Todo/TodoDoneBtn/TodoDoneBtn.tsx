import { useAppDispatch } from '../../../../hooks';
import { toggleDoneTodo } from '../../../../store/todoSlice';

import styles from './TodoDoneBtn.module.css';

import donesign_inverted from '/donesign_inverted.png';

const TodoDoneBtn = ({ uniqueIdPass }: { uniqueIdPass: number }) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className={styles.todoDoneBtn}
      onClick={() => dispatch(toggleDoneTodo(uniqueIdPass))}
    >
      <img src={donesign_inverted} className={styles.todoDone}></img>
    </div>
  );
};

export default TodoDoneBtn;
