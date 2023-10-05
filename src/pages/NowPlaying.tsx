import React from 'react';
import { MovieList } from '@/components';
import { getNowPlaying } from '@/utils';

const NowPlaying = () => {
  return (
    <>
      <MovieList dataKey="comingSoon" fetchData={getNowPlaying} />
    </>
  );
};

export default NowPlaying;
