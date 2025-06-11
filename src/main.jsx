import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { routes } from './router/router'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={createBrowserRouter(routes)} />
    </ErrorBoundary>
  </StrictMode>,
)
