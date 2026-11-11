import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { TodoSection } from './TodoSection'
import type { Todo } from '../types/todo'

const initialTodos: Todo[] = [
  { id: 1, userId: 1, title: 'Buy groceries', completed: false },
  { id: 2, userId: 1, title: 'Read a book', completed: false },
  { id: 3, userId: 2, title: 'Another users task', completed: false },
]

let fetchMock: ReturnType<typeof vi.fn>

beforeEach(() => {
  fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => initialTodos,
  })
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe('TodoSection', () => {
  it('adds a valid todo locally without making another request', async () => {
    const user = userEvent.setup()
    render(<TodoSection userId={1} />)
    await screen.findByText('Buy groceries')
    expect(screen.queryByText('Another users task')).toBeNull()
    expect(fetchMock).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/', expect.objectContaining({ signal: expect.any(AbortSignal) }))
    expect(fetchMock).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/', expect.objectContaining({ signal: expect.any(AbortSignal) }))

    await user.type(screen.getByRole('textbox', { name: 'Nueva tarea' }), 'Plan a trip')
    await user.click(screen.getByRole('button', { name: 'Añadir tarea' }))

    expect(await screen.findByText('Plan a trip')).toBeTruthy()
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('rejects a new todo title containing numbers', async () => {
    const user = userEvent.setup()
    render(<TodoSection userId={1} />)
    await screen.findByText('Buy groceries')
    const titleInput = screen.getByRole('textbox', { name: 'Nueva tarea' })

    await user.type(titleInput, 'Call Alex 2')
    await user.click(screen.getByRole('button', { name: 'Añadir tarea' }))

    expect((await screen.findByRole('alert')).textContent).toContain('no puede contener numeros')
    expect(titleInput.getAttribute('aria-invalid')).toBe('true')
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('deletes a todo locally', async () => {
    const user = userEvent.setup()
    render(<TodoSection userId={1} />)
    await screen.findByText('Buy groceries')

    await user.click(screen.getByRole('button', { name: 'Borrar Buy groceries' }))

    expect(screen.queryByText('Buy groceries')).toBeNull()
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('filters todos reactively by title', async () => {
    const user = userEvent.setup()
    render(<TodoSection userId={1} />)
    await screen.findByText('Buy groceries')

    await user.type(screen.getByRole('textbox', { name: 'Buscar tareas' }), 'groceries')

    expect(screen.getByText('Buy groceries')).toBeTruthy()
    expect(screen.queryByText('Read a book')).toBeNull()
  })
})
