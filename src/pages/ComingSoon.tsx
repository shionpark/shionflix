import React from 'react';
import { MovieList } from '@/components';
import { getComingSoon } from '@/utils';

const ComingSoon = () => {
  return (
    <>
      <MovieList dataKey="comingSoon" fetchData={getComingSoon} />
    </>
  );
};

export default ComingSoon;
