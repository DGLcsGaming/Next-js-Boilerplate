import type { Todo } from '../../types/todo';
import apiSlice from '../api/apiSlice';

export const todoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => `/todos?_limit=5`,
      providesTags: [{ type: 'Todos', id: 'LIST' }],
    }),
    getTodo: builder.query<Todo, { number: number }>({
      query: (body) => ({
        url: `/todos/${body.number}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'Todos', id: 'LIST' }],
    }),
    // updateTodo: builder.mutation({
    //   query: (body) => ({
    //     url: `/todos/${body.number}`,
    //     method: 'PUT',
    //     body: { ...body },
    //   }),
    // }),
  }),
});

export const { useGetTodoQuery, useGetTodosQuery } = todoApiSlice;
