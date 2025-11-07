import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Navigate,RouterProvider,createBrowserRouter} from 'react-router-dom'
import Rootlayout from '../components/Rootlayout.jsx'
import Home from '../components/Home.jsx'
import Signin from '../components/Signin.jsx'
import Signup from '../components/signup.jsx'
import Profile from '../pages/profile.jsx'
import App from './App.jsx'
import Recommendations from '../components/Recommendations.jsx';

const browserRouterObj=createBrowserRouter([
  {
    path:"/",
    element:<Rootlayout/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"signup",
        element:<Signup/>
      },
      {
        path:"signin",
        element:<Signin/>
      },{
        path:"profile",
        element:<Profile/>
      },
      {
       path:"recommendations",
    element:<Recommendations/>
      }
    ],
    
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={browserRouterObj}/>
  </StrictMode>,
)
