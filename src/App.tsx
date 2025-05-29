
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout/Layout'
import { HomePage } from './pages/HomePage'
import { SettingsPage } from './pages/SettingsPage'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Layout/>}>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/settings' element={<SettingsPage/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
