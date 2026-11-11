import { describe, expect, it } from 'vitest'
import { validateTodoTitle } from './validateTodoTitle'

describe('validateTodoTitle', () => {
  it('rejects an empty or whitespace-only title', () => {
    expect(validateTodoTitle('')).toBeTruthy()
    expect(validateTodoTitle('   ')).toBeTruthy()
  })

  it('rejects a title that contains a digit', () => {
    expect(validateTodoTitle('Call Alex 2')).toBeTruthy()
  })

  it('accepts a text-only title', () => {
    expect(validateTodoTitle('Call Alex')).toBeNull()
  })
})
