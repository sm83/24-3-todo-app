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

export const fetchColumns = createAsyncThunk<
  Column[],
  undefined,
  { rejectValue: string }
>('columns/fetchColumns', async function (_, { rejectWithValue }) {
  try {
    const response = await fetch('http://localhost:3001/columns');
    console.log(response);

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
  const column = {
    name: name,
  };

  const response = await fetch('http://localhost:3001/columns', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(column),
  });

  if (!response.ok) {
    return rejectWithValue("Can't add column. Server error.");
  }

  return (await response.json()) as Column;
});

const columnSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchColumns.pending, (state) => {
        state.loading = true;
        state.columnError = null;
      })
      .addCase(fetchColumns.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
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
  // console.log(action.type);
  return action.type.endsWith('rejected');
}
