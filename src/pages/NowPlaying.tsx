import React from 'react';
import { MovieList } from '@/components';
import { IMovie, getComingSoon } from '@/utils';

const NowPlaying = () => {
  return (
    <>
      <MovieList<IMovie> dataKey="comingSoon" fetchData={getComingSoon} />
    </>
  );
};

export default NowPlaying;
