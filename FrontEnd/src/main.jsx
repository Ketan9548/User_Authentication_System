import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './Components/Home/Home'
import Registration from './Components/Authetication/Registration.jsx'
import Login from './Components/Authetication/Login.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import HomeContaints from './Components/Home/HomeContaints.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<App />}>
      <Route path='/' element={<Home />}>
        <Route path='homecontaints' element={<HomeContaints />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Registration />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
