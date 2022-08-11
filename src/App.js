import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

//
import Login from './pages/Login'
import Register from './pages/Register'
import Todo from './pages/Todo'
import { MyContext } from './context/Context'
import Loading from './components/Loading'


export default function App() {
  
  const {
    state: {
      auth: { isAuth, loading },
    },
  } = useContext(MyContext)

  if (loading) return <Loading />

  if (isAuth)
    return (
      <Routes>
        <Route path='/todo' element={<Todo />} />
        <Route path='*' element={<Navigate to='/todo' />} />
      </Routes>
    )

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  
  )
}
