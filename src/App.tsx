
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LogUpPage } from './pages/LogUpPage'
import { Layout } from './components/layout/Layout/Layout'
import { HomePage } from './pages/HomePage'
import { SettingsPage } from './pages/SettingsPage'
import { LoginPage } from './pages/LoginPage'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/registration' element={<LogUpPage/>}/>
      <Route element={<Layout/>}>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/settings' element={<SettingsPage/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
