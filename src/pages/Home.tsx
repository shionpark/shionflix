import React from 'react';
import { MovieList } from '@/components';
import { getPopular } from '@/utils';

const Home = () => {
  return (
    <>
      <MovieList dataKey="popular" fetchData={getPopular} />
    </>
  );
};

export default Home;
