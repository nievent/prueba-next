import { useCallback, useEffect, useReducer, useRef } from 'react'
import { getTodosByUserId } from '../services/todosService'
import type { Todo } from '../types/todo'

export type TodosState = {
  todos: Todo[]
  isLoading: boolean
  error: string | null
}

export type TodosAction =
  | { type: 'load-start' }
  | { type: 'load-success'; todos: Todo[] }
  | { type: 'load-error'; error: string }
  | { type: 'add'; todo: Todo }
  | { type: 'toggle'; todoId: number }
  | { type: 'edit'; todoId: number; title: string }
  | { type: 'delete'; todoId: number }

export const initialTodosState: TodosState = {
  todos: [],
  isLoading: true,
  error: null,
}

export function todosReducer(state: TodosState, action: TodosAction): TodosState {
  switch (action.type) {
    case 'load-start':
      return { ...state, isLoading: true, error: null }
    case 'load-success':
      return { todos: action.todos, isLoading: false, error: null }
    case 'load-error':
      return { ...state, isLoading: false, error: action.error }
    case 'add':
      return { ...state, todos: [action.todo, ...state.todos] }
    case 'toggle':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.todoId ? { ...todo, completed: !todo.completed } : todo,
        ),
      }
    case 'edit':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.todoId ? { ...todo, title: action.title } : todo,
        ),
      }
    case 'delete':
      return { ...state, todos: state.todos.filter((todo) => todo.id !== action.todoId) }
  }
}

export function useTodos(userId: number) {
  const [state, dispatch] = useReducer(todosReducer, initialTodosState)
  const activeController = useRef<AbortController | null>(null)
  const requestId = useRef(0)
  const nextLocalId = useRef(-1)

  const loadTodos = useCallback(async () => {
    activeController.current?.abort()

    const controller = new AbortController()
    activeController.current = controller
    const currentRequestId = ++requestId.current
    dispatch({ type: 'load-start' })

    try {
      const todos = await getTodosByUserId(userId, controller.signal)
      if (controller.signal.aborted || currentRequestId !== requestId.current) return
      dispatch({ type: 'load-success', todos })
    } catch (cause) {
      if (controller.signal.aborted || currentRequestId !== requestId.current) return
      const error = cause instanceof Error ? cause.message : 'Ha ocurrido un error inesperado.'
      dispatch({ type: 'load-error', error })
    } finally {
      if (currentRequestId === requestId.current) activeController.current = null
    }
  }, [userId])

  useEffect(() => {
    void loadTodos()
    return () => {
      requestId.current += 1
      activeController.current?.abort()
      activeController.current = null
    }
  }, [loadTodos])

  const reload = useCallback(() => void loadTodos(), [loadTodos])
  const addTodo = useCallback((title: string) => {
    const todo: Todo = { id: nextLocalId.current, userId, title, completed: false }
    nextLocalId.current -= 1
    dispatch({ type: 'add', todo })
  }, [userId])
  const toggleTodo = useCallback((todoId: number) => dispatch({ type: 'toggle', todoId }), [])
  const editTodo = useCallback((todoId: number, title: string) => dispatch({ type: 'edit', todoId, title }), [])
  const deleteTodo = useCallback((todoId: number) => dispatch({ type: 'delete', todoId }), [])

  return { ...state, reload, addTodo, toggleTodo, editTodo, deleteTodo }
}
