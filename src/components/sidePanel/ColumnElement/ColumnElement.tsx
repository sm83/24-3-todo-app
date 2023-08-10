import styles from './ColumnElement.module.css';

import { ColumnElementInterface } from '../../../interfaces/ColumnElement.interface';
import ColumnDeleteBtn from './ColumnDeleteBtn/ColumnDeleteBtn';

import { useAppSelector } from '../../../hooks';

const ColumnSide = ({
  columnElement,
}: {
  columnElement: ColumnElementInterface;
}) => {
  let deleteBtnVisible = true;

  const todoListLocal = useAppSelector((state) => state.todos.list);

  for (let i = 0; i < todoListLocal.length; i++) {
    if (todoListLocal[i].columnId == columnElement.columnId) {
      deleteBtnVisible = false;
      break;
    }
  }

  return (
    <>
      <div className={styles.columnBlock}>
        <div className={styles.columnNameArea}>
          <div className={styles.columnName}>{columnElement.name}</div>
          <ColumnDeleteBtn
            columnId={columnElement.columnId}
            visiblePass={deleteBtnVisible}
          />
        </div>
      </div>
    </>
  );
};

export default ColumnSide;
