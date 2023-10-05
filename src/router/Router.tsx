import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import { ComingSoon, Home, NowPlaying } from '@/pages';
import { ComingSoonModal, NowPlayingModal, PopularModal } from '@/components/Modals';

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
            element: <PopularModal />,
          },
        ],
      },
      {
        path: '/coming-soon',
        element: <ComingSoon />,
        children: [
          {
            path: 'movie/:movieId',
            element: <ComingSoonModal />,
          },
        ],
      },
      {
        path: '/now-playing',
        element: <NowPlaying />,
        children: [
          {
            path: 'movie/:movieId',
            element: <NowPlayingModal />,
          },
        ],
      },
    ],
  },
]);

export default router;
