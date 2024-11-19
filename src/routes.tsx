import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import TeamsStats from './pages/TeamsStats'

const AppRoutes: React.FC = () => {
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/teams-stats' element={<TeamsStats />} />
      <Route path='/*' element={<Home />} />
    </Routes>
  </BrowserRouter>
  )
}

export default AppRoutes