import { Suspense, lazy, ElementType } from 'react';
// components
// import { Splash as LoadingScreen } from '../pages/common/splash/Splash';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
  (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    // <Suspense fallback={<Blank />}>
    <Suspense fallback={<></>}>
      <Component {...props} />
    </Suspense>
  );

// const SplashKeepLoadable = (Component: ElementType) => (props: any) => (
//   // eslint-disable-next-line react/jsx-no-useless-fragment
//   <Suspense fallback={<SplashPage />}>
//     <Component {...props} />
//   </Suspense>
// );

// ----------------------------------------------------------------------

// APP
export const MainPage = Loadable(lazy(() => import('../pages/main/page')));
export const DetailPage = Loadable(lazy(() => import('../pages/detail/page')));
export const PlayPage = Loadable(lazy(() => import('../pages/play/page')));

// export const Page404 = Loadable(lazy(() => import('../pages/404')));
// export const Page500 = Loadable(lazy(() => import('../pages/Page500')));
// export const Page403 = Loadable(lazy(() => import('../pages/Page403')));

// components
