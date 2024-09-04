import { Navigate, Outlet, useLocation, useRoutes } from 'react-router-dom';

import { DetailPage, MainPage, RecommendedPage } from './elements';
import Play from '../pages/detail/play/page';
import RecommendedPlayPage from '../pages/recommended/play/page';
import { PATH } from './path';
import { AnimatePresence, motion } from 'framer-motion';

// ----------------------------------------------------------------------

export default function Router() {
  const location = useLocation();

  const routes = useRoutes([
    // App
    {
      path: '',
      element: <Outlet />,
      children: [
        { element: <Navigate to={PATH.main} replace />, index: true },
        { path: 'main', element: <MainPage /> },
        { path: 'exercise/:id', element: <DetailPage /> },
        { path: 'exercise/:id/play', element: <Play /> },
        { path: 'recommended/:id', element: <RecommendedPage /> },
        { path: 'recommended/:id/play', element: <RecommendedPlayPage /> },
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

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={location.pathname}>{routes}</motion.div>
    </AnimatePresence>
  );
}
