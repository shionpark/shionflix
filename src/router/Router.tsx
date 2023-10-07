import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import { ComingSoon, Home, NowPlaying, Search } from '@/pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
        children: [
          {
            path: 'movie/:movieId',
            element: <Home />,
          },
          {
            path: 'search',
            element: <Search />,
          },
        ],
      },
      {
        path: '/coming-soon',
        element: <ComingSoon />,
        children: [
          {
            path: 'movie/:movieId',
            element: <ComingSoon />,
          },
        ],
      },
      {
        path: '/now-playing',
        element: <NowPlaying />,
        children: [
          {
            path: 'movie/:movieId',
            element: <NowPlaying />,
          },
        ],
      },
    ],
  },
]);

export default router;
