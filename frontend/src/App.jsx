import './App.css'
import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import CreateBook from './pages/CreateBook'
import EditBook from './pages/EditBook'
import Home from './pages/Home'
import DeleteBook from './pages/DeleteBook'
import ShowBook from './pages/ShowBook'

function App() {
  return (
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/books/edit/:id' element={<EditBook/>}/>
      <Route path='/books/create' element={<CreateBook/>}/>
      <Route path='/books/delete/:id' element={<DeleteBook/>}/>
      <Route path='/books/details/:id' element={<ShowBook/>}/>
    </Routes>
  )
}

export default App
