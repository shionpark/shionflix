import React from 'react';
import { MovieList } from '@/components';
import { IMovie, getPopular } from '@/utils';

const Home = () => {
  return (
    <>
      <MovieList<IMovie> dataKey="popular" fetchData={getPopular} />
    </>
  );
};

export default Home;
