import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './Components/Home/Home'
import Registration from './Components/Authetication/Registration.jsx'
import Login from './Components/Authetication/Login.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import HomeContaints from './Components/Home/HomeContaints.jsx'
import Password_Fogot from './Components/PasswordRestart/Password_Fogot.jsx'
import Password_Restart from './Components/PasswordRestart/Password_Restart.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<App />}>
      <Route path='/' element={<Home />}>
        <Route path='homecontaints' element={<HomeContaints />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Registration />} />
        <Route path='forgotpassword' element={<Password_Fogot />} />
        <Route path='restartpassword' element={<Password_Restart />} />
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
