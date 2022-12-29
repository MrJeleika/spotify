import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
// Styles
import './index.css'
// Components
import App from './App'
// Store
import { store } from './redux/app/store'
import { ScrollToTop } from 'components/common/ScrollToTop/ScrollToTop'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ScrollToTop />
      <App />
    </Provider>
  </BrowserRouter>
)
