import { useAppSelector } from '../../../hooks';

import ColumnSide from '../ColumnElement/ColumnElement';

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
