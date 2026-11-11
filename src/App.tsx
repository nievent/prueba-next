import { UsersPage } from './features/users/pages/UsersPage'
import { UserDetailPage } from './features/users/pages/UserDetailPage'
import { AlbumDetailPage } from './features/albums/pages/AlbumDetailPage'

function App() {
  const albumMatch = window.location.pathname.match(/^\/albums\/(\d+)\/?$/)
  if (albumMatch) {
    return <AlbumDetailPage albumId={Number(albumMatch[1])} />
  }

  const match = window.location.pathname.match(/^\/users\/(\d+)\/?$/)

  if (match) {
    return <UserDetailPage userId={Number(match[1])} />
  }

  return <UsersPage />
}

export default App
