import styles from './ColumnSide.module.css';

import { ColumnElementInterface } from '../../../interfaces/ColumnElement.interface';

const ColumnSide = ({
  columnElement,
}: {
  columnElement: ColumnElementInterface;
}) => {
  return (
    <>
      <div className={styles.columnBlock}>
        <div className={styles.columnNameArea}>
          <div className={styles.columnName}>{columnElement.name}</div>
        </div>
      </div>
    </>
  );
};

export default ColumnSide;
