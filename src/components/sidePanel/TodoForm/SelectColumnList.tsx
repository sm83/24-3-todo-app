import styles from './TodoForm.module.css';

import { useAppSelector } from '../../../hooks';

const SelectColumnList = ({
  handleInputColumn,
}: {
  handleInputColumn: (value: number) => void;
}) => {
  const columns = useAppSelector((state) => state.columns.list);

  return (
    <select
      className={styles.input}
      onChange={(e) => handleInputColumn(+e.target.value)}
    >
      {columns.map((column, index) => (
        <option key={index} value={column.columnId}>
          {column.name}
        </option>
      ))}
    </select>
  );
};

export default SelectColumnList;
