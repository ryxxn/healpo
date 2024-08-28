import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import {
  DetailPage,
  // APP
  MainPage,
  PlayPage,
} from './elements';
import { PATH } from './path';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // App
    {
      path: '',
      element: <Outlet />,
      children: [
        { element: <Navigate to={PATH.main} replace />, index: true },
        { path: 'main', element: <MainPage /> },
        { path: 'exercise/:id', element: <DetailPage /> },
        { path: 'exercise/:id/play', element: <PlayPage /> },
      ],
    },
    // error
    // {
    //   path: '404',
    //   element: <Page404 />,
    // },
    { path: '*', element: <Navigate to="/404" replace /> },
    { path: '*', element: <Navigate to="/" replace /> },
  ]);
}
