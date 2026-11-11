import { describe, expect, it } from 'vitest'
import { filterTodos } from './filterTodos'
import type { Todo } from '../types/todo'

const todos: Todo[] = [
  { id: 1, userId: 1, title: 'Buy groceries', completed: false },
  { id: 2, userId: 1, title: 'Read a book', completed: true },
]

describe('filterTodos', () => {
  it('returns every todo when the query is empty', () => {
    expect(filterTodos(todos, '  ')).toEqual(todos)
  })

  it('filters titles without case sensitivity', () => {
    expect(filterTodos(todos, 'GROCERIES')).toEqual([todos[0]])
  })
})
