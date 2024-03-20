import ReactDOM from 'react-dom/client'

import{
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"


import './css/index.css'
import App from './pages/App.tsx'

import { io } from 'socket.io-client'

export const socket = io('http://localhost:3100');

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)