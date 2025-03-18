import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './Components/Home/Home'
import Registration from './Components/Authetication/Registration.jsx'
import Login from './Components/Authetication/Login.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import HomeContaints from './Components/Home/HomeContaints.jsx'
// import axios from "axios";
import { useState, createContext } from 'react'

const [users, setUsers] = useState('');
const UserContext = createContext('')


// const getdata = async (users) => {
//   try {
//     const response = await axios.get(`/api/users/${users}`);
//     setUsers(response.data.username);
//     console.log("Data: ", response.data);
//   } catch (error) {
//     console.error("Error: ", error);
//   }
// }

const router = createBrowserRouter(
  createRoutesFromElements(
    <UserContext.Provider value={users}>
      <Route path='' element={<App />}>
        <Route path='/' element={<Home />}>
          <Route path='homecontaints' element={<HomeContaints />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Registration />} />
        </Route>
      </Route>
    </UserContext.Provider>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
