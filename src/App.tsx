import { BrowserRouter, Navigate, Route,  Routes } from 'react-router-dom'
import './App.css'
import BookPage from './pages/BookPage'
import LoginPage from './pages/LoginPage'
import Register from './pages/Register'
import Dashboardpage from './pages/Dashboardpage'
import Catalogpage from './pages/Catalogpage'
import Settingpage from './pages/Settingpage'
import ProtectedRoute from './components/ProtectRoute'

function App() {


  return (
    <>
      <BrowserRouter>
           <Routes>       
              <Route path='/' element={!localStorage.getItem("token") ? <LoginPage /> : <Navigate to="/home" />}/>
              <Route path='/register' element={<Register/>} />
              <Route path='/book' element={<ProtectedRoute> <BookPage/></ProtectedRoute> } />
              <Route path='/dashboard' element={<ProtectedRoute> <Dashboardpage/> </ProtectedRoute>} />
              <Route path='/catalog' element={<ProtectedRoute> <Catalogpage/> </ProtectedRoute>} />
              <Route path='/setting' element={<ProtectedRoute> <Settingpage/> </ProtectedRoute>} />
           </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
