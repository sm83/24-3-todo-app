import { useAppSelector } from '../../../hooks';

import ColumnSide from '../ColumnSide/ColumnSide';

const ColumnControlList = ({}: {}) => {
  return (
    <div>
      {useAppSelector((state) => state.columns.list).map(
        (columnObject, index) => (
          <ColumnSide key={index} columnElement={columnObject} />
        )
      )}
    </div>
  );
};

export default ColumnControlList;
