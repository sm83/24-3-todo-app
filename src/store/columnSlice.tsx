import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from '@reduxjs/toolkit';

// import columnStartData from '../data/columns0.json';

type Column = {
  name: string;
  columnId: number;
};

type ColumnList = {
  list: Column[];
  loading: boolean;
  columnError: string | null;
};

const initialState: ColumnList = {
  list: [],
  loading: false,
  columnError: null,
};

const columnJsonServer = 'http://localhost:3001/columns';

export const fetchColumn = createAsyncThunk<
  Column[],
  undefined,
  { rejectValue: string }
>('columns/fetchColumn', async function (_, { rejectWithValue }) {
  try {
    const response = await fetch(columnJsonServer);
    // console.log(response);

    if (!response.ok) {
      throw new Error();
    }

    const columnsData = await response.json();

    return [{ name: 'Unsorted', columnId: 0 }, ...columnsData];
  } catch (error) {
    return rejectWithValue('Connection refused.');
  }
});

export const addColumn = createAsyncThunk<
  Column,
  { name: string },
  { rejectValue: string }
>('columns/addColumn', async function ({ name }, { rejectWithValue }) {
  try {
    const column = {
      name: name,
    };

    const response = await fetch(columnJsonServer, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(column),
    });

    if (!response.ok) {
      throw new Error();
    }

    return (await response.json()) as Column;
  } catch (error) {
    return rejectWithValue("Can't add column. Server error.");
  }
});

export const deleteColumn = createAsyncThunk<
  number | string,
  number,
  { rejectValue: string }
>('columns/deleteColumn', async function (columnId, { rejectWithValue }) {
  try {
    const response = await fetch(`${columnJsonServer}/${columnId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error();
    }

    return columnId;
  } catch (error) {
    return rejectWithValue("Can't delete column. Server error.");
  }
});

const columnSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchColumn.pending, (state) => {
        state.loading = true;
        state.columnError = null;
      })
      .addCase(fetchColumn.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(addColumn.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (column) => column.columnId !== action.payload
        );
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        // console.log(action.payload);
        state.columnError = action.payload;
        state.loading = false;
      });
  },
});

export default columnSlice.reducer;

function isError(action: AnyAction) {
  const matcherEndsWith = 'Column/rejected';

  if (action.type.endsWith(matcherEndsWith)) {
    console.log(action.type.endsWith(matcherEndsWith));
  }
  return action.type.endsWith(matcherEndsWith);
}
