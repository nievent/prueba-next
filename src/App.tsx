import { UsersPage } from './features/users/pages/UsersPage'
import { UserDetailPage } from './features/users/pages/UserDetailPage'

function App() {
  const match = window.location.pathname.match(/^\/users\/(\d+)\/?$/)

  if (match) {
    return <UserDetailPage userId={Number(match[1])} />
  }

  return <UsersPage />
}

export default App
