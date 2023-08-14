import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from '@reduxjs/toolkit';

import axios from 'axios';

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

export const todosInstance = axios.create({
  baseURL: 'http://localhost:3000/todos',
});

export const fetchTodo = createAsyncThunk<
  Todo[],
  undefined,
  { rejectValue: string }
>('todos/fetchTodo', async function (_, { rejectWithValue }) {
  try {
    const response = await todosInstance.get('http://localhost:3000/todos');

    if (response.statusText != 'OK') {
      throw new Error();
    }

    // const todoData = await response.json();

    return response.data;
  } catch (error) {
    return rejectWithValue('Server error!');
  }
});

// export const fetchTodo = createAsyncThunk<
//   Todo[],
//   undefined,
//   { rejectValue: string }
// >('todos/fetchTodo', async function (_, { rejectWithValue }) {
//   try {
//     const response = await fetch('http://localhost:3000/todos');

//     if (!response.ok) {
//       throw new Error();
//     }

//     const todoData = await response.json();

//     return todoData;
//   } catch (error) {
//     return rejectWithValue('Server error!');
//   }
// });

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
  async ({ name, description, columnId }, { rejectWithValue }) => {
    try {
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
        throw new Error();
      }

      return (await response.json()) as Todo;
    } catch (error) {
      return rejectWithValue("Can't add task. Server error.");
    }
  }
);

export const toggleDoneTodo = createAsyncThunk<
  Todo,
  number,
  { rejectValue: string; state: { todos: TodoList } }
>(
  'todos/toggleDoneTodo',
  async function (uniqueId, { rejectWithValue, getState }) {
    try {
      const todo = getState().todos.list.find(
        (todo) => todo.uniqueId === uniqueId
      );

      if (todo) {
        const response = await fetch(
          `http://localhost:3000/todos/${uniqueId}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              done: !todo.done,
            }),
          }
        );

        if (!response.ok) {
          throw new Error();
        }

        return (await response.json()) as Todo;
      }

      return rejectWithValue('No such todo in the list');
    } catch (error) {
      return rejectWithValue("Can't toggle status. Server error.");
    }
  }
);

export const deleteTodo = createAsyncThunk<
  number | string,
  number,
  { rejectValue: string }
>('todos/deleteTodo', async function (uniqueId, { rejectWithValue }) {
  try {
    const response = await fetch(`http://localhost:3000/todos/${uniqueId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error();
    }

    return uniqueId;
  } catch (error) {
    return rejectWithValue("Can't delete task. Server error.");
  }
});

//slice here
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.loading = true;
        state.todoError = null;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
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
        console.log(action.payload);
        state.todoError = action.payload;
        state.loading = false;
      });
  },
});

export default todoSlice.reducer;

function isError(action: AnyAction) {
  const matcherEndsWith = 'Todo/rejected';

  if (action.type.endsWith(matcherEndsWith)) {
    console.log(action.type.endsWith(matcherEndsWith));
  }
  return action.type.endsWith(matcherEndsWith);
}
