import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RecoilRoot } from 'recoil'
import { RouterProvider } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import KanbanBoardPage from './Pages/KanbanBoard/KanbanBoard.page'
import KanbanDetailPage from './Pages/KanbanBoard/KanbanDetail.page'
import HomePage from './Pages/Home/Home.page'
import ApplicantBoardPage from './Pages/ApplicantBoard/ApplicantBoard.page'
import ApplicationPage from './Pages/Application/Application.page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },

  {
    path: '/application/:period',
    element: <ApplicationPage />,
  },

  {
    path: '/kanban/:period',
    children: [
      { path: '/kanban/:period', element: <KanbanBoardPage /> },
      { path: '/kanban/:period/detail', element: <KanbanDetailPage /> },
    ],
  },
  {
    path: '/applicant/:period',
    children: [{ path: '/applicant/:period', element: <ApplicantBoardPage /> }],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
)
