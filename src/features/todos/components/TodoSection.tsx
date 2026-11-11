import { useMemo, useState, type FormEvent } from 'react'
import { useTodos } from '../hooks/useTodos'
import { filterTodos } from '../utils/filterTodos'
import { validateTodoTitle } from '../utils/validateTodoTitle'
import '../todos.css'

type TodoSectionProps = {
  userId: number
}

export function TodoSection({ userId }: TodoSectionProps) {
  const { todos, isLoading, error, reload, addTodo, toggleTodo, editTodo, deleteTodo } = useTodos(userId)
  const [newTitle, setNewTitle] = useState('')
  const [newTitleError, setNewTitleError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null)
  const [editingTitle, setEditingTitle] = useState('')
  const [editingTitleError, setEditingTitleError] = useState<string | null>(null)
  const filteredTodos = useMemo(() => filterTodos(todos, query), [todos, query])

  function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const validationError = validateTodoTitle(newTitle)
    setNewTitleError(validationError)
    if (validationError) return

    addTodo(newTitle.trim())
    setNewTitle('')
  }

  function startEditing(todoId: number, title: string) {
    setEditingTodoId(todoId)
    setEditingTitle(title)
    setEditingTitleError(null)
  }

  function handleEdit(event: FormEvent<HTMLFormElement>, todoId: number) {
    event.preventDefault()
    const validationError = validateTodoTitle(editingTitle)
    setEditingTitleError(validationError)
    if (validationError) return

    editTodo(todoId, editingTitle.trim())
    setEditingTodoId(null)
  }

  if (isLoading) {
    return <section className="todo-section" aria-labelledby="todos-title"><h2 id="todos-title">Tareas</h2><div className="list-feedback" role="status"><span className="loading-spinner" />Cargando tareas...</div></section>
  }

  if (error) {
    return (
      <section className="todo-section" aria-labelledby="todos-title">
        <h2 id="todos-title">Tareas</h2>
        <div className="list-feedback has-error" role="alert"><span className="error-symbol">!</span><div><strong>No se pudieron cargar las tareas</strong><p>{error}</p><button className="retry-button" onClick={reload}>Volver a intentar</button></div></div>
      </section>
    )
  }

  return (
    <section className="todo-section" aria-labelledby="todos-title">
      <header className="todo-heading"><div><h2 id="todos-title">Tareas</h2><p>Organiza tus pendientes</p></div><span>{todos.length}</span></header>
      <form className="todo-add-form" onSubmit={handleAdd}>
        <label className="todo-input-label" htmlFor="new-todo-title">Nueva tarea</label>
        <div className="todo-add-controls">
          <input
            id="new-todo-title"
            value={newTitle}
            onChange={(event) => { setNewTitle(event.target.value); setNewTitleError(null) }}
            aria-invalid={Boolean(newTitleError)}
            aria-describedby={newTitleError ? 'new-todo-error' : undefined}
            placeholder="Escribe una tarea..."
          />
          <button type="submit">Añadir tarea</button>
        </div>
        {newTitleError && <p className="todo-error" id="new-todo-error" role="alert">{newTitleError}</p>}
      </form>

      <label className="todo-search-label" htmlFor="todo-search">Buscar tareas</label>
      <input id="todo-search" className="todo-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filtrar por texto..." />

      {filteredTodos.length === 0 ? (
        <div className="todo-empty">{todos.length === 0 ? 'Todavia no hay tareas.' : 'No hay tareas que coincidan con la busqueda.'}</div>
      ) : (
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <li className="todo-item" key={todo.id}>
              {editingTodoId === todo.id ? (
                <form className="todo-edit-form" onSubmit={(event) => handleEdit(event, todo.id)}>
                  <input
                    aria-label={`Editar tarea ${todo.title}`}
                    value={editingTitle}
                    onChange={(event) => { setEditingTitle(event.target.value); setEditingTitleError(null) }}
                    aria-invalid={Boolean(editingTitleError)}
                    aria-describedby={editingTitleError ? `edit-todo-error-${todo.id}` : undefined}
                  />
                  <button type="submit">Guardar</button>
                  <button type="button" className="todo-secondary-button" onClick={() => setEditingTodoId(null)}>Cancelar</button>
                  {editingTitleError && <p className="todo-error" id={`edit-todo-error-${todo.id}`} role="alert">{editingTitleError}</p>}
                </form>
              ) : (
                <>
                  <label className="todo-check-row">
                    <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} aria-label={`${todo.completed ? 'Marcar como pendiente' : 'Marcar como completada'}: ${todo.title}`} />
                    <span className={todo.completed ? 'todo-title is-completed' : 'todo-title'}>{todo.title}</span>
                  </label>
                  <div className="todo-actions">
                    <button type="button" className="todo-secondary-button" onClick={() => startEditing(todo.id, todo.title)} aria-label={`Editar ${todo.title}`}>Editar</button>
                    <button type="button" className="todo-delete-button" onClick={() => deleteTodo(todo.id)} aria-label={`Borrar ${todo.title}`}>Borrar</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
