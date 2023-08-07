import { useEffect } from 'react';

import styles from './ColumnControl.module.css';

import ColumnControlList from '../ColumnControlList/ColumnControlList';
import ColumnForm from '../ColumnForm/ColumnForm';

import { useAppDispatch } from '../../../hooks';
import { fetchColumns } from '../../../store/columnSlice';

const ColumnControl = ({}: {}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchColumns());
  }, [dispatch]);

  return (
    <div>
      <div className={styles.columnControlArea}>
        <div className={styles.text1}>Column Control</div>
        <ColumnControlList />
        <ColumnForm />
      </div>
    </div>
  );
};

export default ColumnControl;
