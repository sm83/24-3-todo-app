import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import todoStartData from '../data/todos2.json';

type Todo = {
  name: string;
  description: string;
  columnId: number;
  uniqueId: number;
  done: boolean;
};

type TodoList = {
  list: Todo[];
};

const initialState: TodoList = {
  list: todoStartData,
};

type AddTodoPayload = {
  name: string;
  description: string;
  columnId: number;
  uniqueId: number;
  done: boolean;
};

//slice here
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<AddTodoPayload>) {
      state.list.push({
        name: action.payload.name,
        description: action.payload.description,
        columnId: action.payload.columnId,
        uniqueId: action.payload.uniqueId,
        done: false,
      });
    },
    deleteTodo(state, action: PayloadAction<number>) {
      state.list = state.list.filter(
        (todo: Todo) => todo.uniqueId !== action.payload
      );
    },
    toggleDoneTodo(state, action: PayloadAction<number>) {
      const index = state.list.findIndex(
        (todo) => todo.uniqueId === action.payload
      );

      if (!state.list[index].done) {
        state.list[index].done = true;
      } else {
        state.list[index].done = false;
      }
    },
  },
});

export const { addTodo, deleteTodo, toggleDoneTodo } = todoSlice.actions;

export default todoSlice.reducer;
