import { useAppSelector } from '../../../hooks';

import styles from './Status.module.css';

const statusHidden = ``;
const statusVisible = `${styles.statusArea}`;

const ColumnStatus = () => {
  let statusArea;

  const { loading, columnError } = useAppSelector((state) => state.columns);

  if (loading || columnError) {
    statusArea = statusVisible;
  } else {
    statusArea = statusHidden;
  }

  return (
    <div className={statusArea}>
      {loading && <h2>Loading...</h2>}
      {columnError && <h2>An error occured: {columnError}</h2>}
    </div>
  );
};

export default ColumnStatus;
