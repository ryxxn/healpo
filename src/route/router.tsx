import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import {
  // APP
  MainPage,
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
        { element: <Navigate to={PATH.MAIN} replace />, index: true },
        { path: 'main', element: <MainPage /> },
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
