import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from '@reduxjs/toolkit';

type Todo = {
  uniqueId: number;
  name: string;
  description: string;
  columnId: number;
  done: boolean;
};

type TodoList = {
  list: Todo[];
  loading: boolean;
  todoError: string | null;
};

const initialState: TodoList = {
  list: [],
  loading: false,
  todoError: null,
};

export const fetchTodos = createAsyncThunk<
  Todo[],
  undefined,
  { rejectValue: string }
>('todos/fetchTodos', async function (_, { rejectWithValue }) {
  const response = await fetch('http://localhost:3000/todos');

  if (!response.ok) {
    return rejectWithValue('Server error!');
  }

  const todoData = await response.json();

  return todoData;
});

export const addTodo = createAsyncThunk<
  Todo,
  {
    name: string;
    description: string;
    columnId: number;
  },
  { rejectValue: string }
>(
  'todos/addTodo',
  async function ({ name, description, columnId }, { rejectWithValue }) {
    const todo = {
      name: name,
      description: description,
      columnId: columnId,
      done: false,
    };

    const response = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      return rejectWithValue("Can't add task. Server error.");
    }

    return (await response.json()) as Todo;
  }
);

export const toggleDoneTodo = createAsyncThunk<
  Todo,
  number,
  { rejectValue: string; state: { todos: TodoList } }
>(
  'todos/toggleDoneTodo',
  async function (uniqueId, { rejectWithValue, getState }) {
    const todo = getState().todos.list.find(
      (todo) => todo.uniqueId === uniqueId
    );

    if (todo) {
      const response = await fetch(`http://localhost:3000/todos/${uniqueId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          done: !todo.done,
        }),
      });

      if (!response.ok) {
        rejectWithValue("Can't toggle status. Server error.");
      }

      return (await response.json()) as Todo;
    }

    return rejectWithValue('No such todo in the list');
  }
);

export const deleteTodo = createAsyncThunk<
  number | string,
  number,
  { rejectValue: string }
>('todos/deleteTodo', async function (uniqueId, { rejectWithValue }) {
  const response = await fetch(`http://localhost:3000/todos/${uniqueId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    return rejectWithValue("Can't delete task. Server error.");
  }

  return uniqueId;
});

//slice here
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.todoError = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(addTodo.pending, (state) => {
        state.todoError = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(toggleDoneTodo.fulfilled, (state, action) => {
        const toggledTodo = state.list.find(
          (todo) => todo.uniqueId === action.payload.uniqueId
        );
        if (toggledTodo) {
          toggledTodo.done = !toggledTodo.done;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (todo) => todo.uniqueId !== action.payload
        );
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.todoError = action.payload;
        state.loading = false;
      });
  },
});

export default todoSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
