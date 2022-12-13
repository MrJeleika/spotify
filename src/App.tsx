import './App.css'
import { Dashboard } from './components/Dashboard/Dashboard'
import { Login } from './components/Login/Login'
import { useAppSelector } from './redux/app/hooks'

export const App = () => {
  const token = useAppSelector((state) => state.auth.token)
  return <div className="App">{token ? <Dashboard /> : <Login />}</div>
}

export default App
