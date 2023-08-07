import Column from '../Column/Column';

import styles from './ColumnList.module.css';

import { useAppSelector } from '../../../hooks';

const ColumnList = () => {
  return (
    <div className={styles.columnsContainer}>
      {useAppSelector((state) => state.columns.list).map(
        (columnObject, index) => (
          <Column key={index} columnElement={columnObject} />
        )
      )}
    </div>
  );
};

export default ColumnList;
