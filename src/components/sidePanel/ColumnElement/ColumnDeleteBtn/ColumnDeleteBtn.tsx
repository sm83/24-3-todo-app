import styles from '../ColumnElement.module.css';

import trashbin from '/trashbin.png';

import { useAppDispatch } from '../../../../hooks';
import { deleteColumn } from '../../../../store/columnSlice';

const ColumnDeleteBtn = ({
  columnId,
  visiblePass,
}: {
  columnId: number;
  visiblePass: boolean;
}) => {
  const dispatch = useAppDispatch();

  if (visiblePass) {
    return (
      <div
        className={styles.columnDeleteBtn}
        onClick={() => dispatch(deleteColumn(columnId))}
      >
        <img src={trashbin} className={styles.columnDelete}></img>
      </div>
    );
  } else {
    return null;
  }
};

export default ColumnDeleteBtn;
