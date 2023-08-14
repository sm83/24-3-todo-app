import { useAppSelector } from '../../../hooks';

import styles from './Status.module.css';

const statusHidden = `${styles.statusAreaNone}`;
const statusVisible = `${styles.statusArea}`;

const TodoStatus = () => {
  let statusArea;

  const { loading, todoError } = useAppSelector((state) => state.todos);

  if (loading || todoError) {
    statusArea = statusVisible;
  } else {
    statusArea = statusHidden;
  }

  return (
    <div className={statusArea}>
      {loading && <h2>Loading...</h2>}
      {todoError && <h2>An error occured: {todoError}</h2>}
    </div>
  );
};

export default TodoStatus;
