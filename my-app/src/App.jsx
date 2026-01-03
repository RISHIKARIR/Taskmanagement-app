import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Register from './Pages/Register'
import {Routes,Route} from "react-router-dom";
import Navbar from './Components/Navbar'
import Taskcard from './Components/Taskcard'


function App() {
  

  return (
    <> 
    
     <Routes> 
       
       <Route path='/' element={<Login/>}></Route> 
       <Route path='/Register' element={<Register/>}></Route>
         <Route path='/Dashboard' element={<Dashboard/>}></Route>
       </Routes>
       
    </>
  )
}

export default App
