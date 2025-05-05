import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { routes } from './router/router'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={createBrowserRouter(routes)} />
  </StrictMode>,
)
