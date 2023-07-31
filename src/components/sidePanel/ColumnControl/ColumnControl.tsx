import styles from './ColumnControl.module.css';

import ColumnControlList from '../ColumnControlList/ColumnControlList';
import ColumnForm from '../ColumnForm/ColumnForm';

const ColumnControl = ({}: {}) => {
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
