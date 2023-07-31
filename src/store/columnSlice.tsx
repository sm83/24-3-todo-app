import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import columnStartData from '../data/columns0.json';

type Column = {
  name: string;
  columnId: number;
};

type ColumnList = {
  list: Column[];
};

type AddColumnPayload = {
  name: string;
  columnId: number;
};

const initialState: ColumnList = {
  list: [{ name: 'Unsorted', columnId: 0 }, ...columnStartData],
};

const columnSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    addColumn(state, action: PayloadAction<AddColumnPayload>) {
      state.list.push({
        name: action.payload.name,
        columnId: action.payload.columnId,
      });
    },
  },
});

export const { addColumn } = columnSlice.actions;

export default columnSlice.reducer;
