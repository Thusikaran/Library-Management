import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import './App.css'
import BookPage from './pages/BookPage'
import LoginPage from './pages/LoginPage'
import Register from './pages/Register'

function App() {


  return (
    <>
      <BrowserRouter>
           <Routes>
              <Route path='/book' element={<BookPage/>} />
              <Route path='/' element={<LoginPage/>}/>
              <Route path='/register' element={<Register/>} />
           </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
