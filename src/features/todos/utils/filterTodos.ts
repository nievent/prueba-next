import type { Todo } from '../types/todo'

export function filterTodos(todos: Todo[], query: string): Todo[] {
  const normalizedQuery = query.trim().toLocaleLowerCase()
  if (!normalizedQuery) return todos

  return todos.filter((todo) => todo.title.toLocaleLowerCase().includes(normalizedQuery))
}
