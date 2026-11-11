import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { addRecent, readRecent } from './recentAlbums'

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('recentAlbums', () => {
  it('keeps a maximum of five albums', () => {
    for (let id = 1; id <= 6; id += 1) {
      addRecent({ id, title: `Album ${id}` })
    }

    expect(readRecent().map((album) => album.id)).toEqual([6, 5, 4, 3, 2])
  })

  it('does not store duplicate ids', () => {
    addRecent({ id: 1, title: 'First title' })
    addRecent({ id: 2, title: 'Second title' })
    addRecent({ id: 1, title: 'Updated title' })

    expect(readRecent()).toEqual([
      { id: 1, title: 'Updated title' },
      { id: 2, title: 'Second title' },
    ])
  })

  it('puts the latest visit first', () => {
    addRecent({ id: 1, title: 'First' })
    addRecent({ id: 2, title: 'Second' })
    addRecent({ id: 3, title: 'Third' })

    expect(readRecent().map((album) => album.id)).toEqual([3, 2, 1])
  })

  it('returns an empty list when stored JSON is corrupt', () => {
    localStorage.setItem('recent-albums', '{invalid json')

    expect(readRecent()).toEqual([])
  })

  it('continues to work when localStorage is unavailable', () => {
    vi.stubGlobal('localStorage', null)

    expect(readRecent()).toEqual([])
    expect(addRecent({ id: 1, title: 'First' })).toEqual([{ id: 1, title: 'First' }])
  })
})
