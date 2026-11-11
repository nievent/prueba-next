import type { Todo } from '../types/todo'

const TODOS_ENDPOINT = 'https://jsonplaceholder.typicode.com/todos/'

export async function getTodosByUserId(userId: number, signal: AbortSignal): Promise<Todo[]> {
  const response = await fetch(TODOS_ENDPOINT, { signal })

  if (!response.ok) {
    throw new Error('No se pudieron cargar las tareas.')
  }

  const todos = (await response.json()) as Todo[]
  return todos.filter((todo) => todo.userId === userId)
}
