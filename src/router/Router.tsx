import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ComingSoon, Home, NowPlaying } from '@/pages';
import App from '@/App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/coming-soon',
        element: <ComingSoon />,
      },
      {
        path: '/now-playing',
        element: <NowPlaying />,
      },
    ],
  },
]);

export default router;
