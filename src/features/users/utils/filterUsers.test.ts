
import { describe, it, expect } from 'vitest'
import { filterUsers } from './filterUsers'
import type { User } from '../types/user'

const users: User[] = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496',
      },
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets',
    },
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    address: {
      street: 'Victor Plains',
      suite: 'Suite 879',
      city: 'Wisokyburgh',
      zipcode: '90566-7771',
      geo: {
        lat: '-43.9509',
        lng: '-34.4618',
      },
    },
    phone: '010-692-6593 x09125',
    website: 'anastasia.net',
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains',
    },
  },
]

describe('filterUsers', () => {
  it('returns all users when search is empty', () => {
    expect(filterUsers(users, '')).toEqual(users)
  })

  it('filters users by name', () => {
    expect(filterUsers(users, 'Leanne')).toEqual([users[0]])
  })

  it('filters users by username', () => {
    expect(filterUsers(users, 'Antonette')).toEqual([users[1]])
  })

  it('filters users by email', () => {
    expect(filterUsers(users, 'Sincere@april.biz')).toEqual([users[0]])
  })

  it('filters users by city', () => {
    expect(filterUsers(users, 'Wisokyburgh')).toEqual([users[1]])
  })

  it('filters users by company name', () => {
    expect(filterUsers(users, 'Romaguera-Crona')).toEqual([users[0]])
  })

  it('ignores uppercase and lowercase differences', () => {
    expect(filterUsers(users, 'LEANNE')).toEqual([users[0]])
  })

  it('returns an empty array when there are no matches', () => {
    expect(filterUsers(users, 'Unknown')).toEqual([])
  })
})
