import { describe, expect, it } from 'vitest'
import { todosReducer, type TodosState } from './useTodos'
import type { Todo } from '../types/todo'

const firstTodo: Todo = { id: 1, userId: 1, title: 'Read a book', completed: false }
const initialState: TodosState = { todos: [firstTodo], isLoading: false, error: null }

describe('todosReducer', () => {
  it('adds, toggles, edits, and deletes todos without mutating the previous state', () => {
    const addedTodo: Todo = { id: -1, userId: 1, title: 'Walk the dog', completed: false }
    const addedState = todosReducer(initialState, { type: 'add', todo: addedTodo })
    const toggledState = todosReducer(addedState, { type: 'toggle', todoId: -1 })
    const editedState = todosReducer(toggledState, { type: 'edit', todoId: -1, title: 'Walk the puppy' })
    const deletedState = todosReducer(editedState, { type: 'delete', todoId: 1 })

    expect(initialState.todos).toEqual([firstTodo])
    expect(addedState.todos).toHaveLength(2)
    expect(toggledState.todos[0].completed).toBe(true)
    expect(editedState.todos[0].title).toBe('Walk the puppy')
    expect(deletedState.todos).toEqual([{ ...addedTodo, title: 'Walk the puppy', completed: true }])
  })

  it('records loading and error state transitions', () => {
    const loadingState = todosReducer(initialState, { type: 'load-start' })
    const errorState = todosReducer(loadingState, { type: 'load-error', error: 'Request failed' })
    const loadedState = todosReducer(errorState, { type: 'load-success', todos: [] })

    expect(loadingState.isLoading).toBe(true)
    expect(errorState.error).toBe('Request failed')
    expect(loadedState).toEqual({ todos: [], isLoading: false, error: null })
  })
})
