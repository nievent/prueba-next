export function validateTodoTitle(title: string): string | null {
  if (!title.trim()) return 'El titulo de la tarea es obligatorio.'
  if (/\d/.test(title)) return 'El titulo no puede contener numeros.'
  return null
}
