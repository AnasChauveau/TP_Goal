import ReactDOM from 'react-dom/client'

import{
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"


import './index.css'
import App from './pages/App'
import Attente from './pages/Attente'
import Jeu from './pages/Jeu'

import { io } from 'socket.io-client'

export const socket = io('http://localhost:3100');

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/attente",
    element: <Attente />,
  },
  {
    path: "/jeu",
    element: <Jeu />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)