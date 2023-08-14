import { useEffect } from 'react';

import styles from './ColumnControl.module.css';

import ColumnControlList from '../ColumnControlList/ColumnControlList';
import ColumnForm from '../ColumnForm/ColumnForm';

import { useAppDispatch } from '../../../hooks';
import { fetchColumn } from '../../../store/columnSlice';
import ColumnStatus from '../Status/ColumnStatus';

const ColumnControl = ({}: {}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchColumn());
  }, [dispatch]);

  return (
    <div>
      <div className={styles.columnControlArea}>
        <ColumnStatus />
        <div className={styles.text1}>Column Control</div>
        <ColumnControlList />
        <ColumnForm />
      </div>
    </div>
  );
};

export default ColumnControl;
