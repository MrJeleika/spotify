import './App.css'
import 'styles/slider.scss'
// Components
import { Login } from './components/Login/Login'
// Hooks
import { MySpotifyPlayer } from 'components/Dashboard/SpotifyPlayer'

export const App = () => {
  const token = localStorage.getItem('token')
  return <div className="App">{token ? <MySpotifyPlayer /> : <Login />}</div>
}

export default App
