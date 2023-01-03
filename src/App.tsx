import './App.css'
import 'styles/slider.scss'
// Components
import { Login } from './components/Login/Login'
// Hooks
import { useAppSelector } from './redux/app/hooks'
import { MySpotifyPlayer } from 'components/Dashboard/SpotifyPlayer'

export const App = () => {
  const token = useAppSelector((state) => state.auth.token)
  return <div className="App">{token ? <MySpotifyPlayer /> : <Login />}</div>
}

export default App
