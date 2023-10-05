import React from 'react';
import { Outlet, useMatch, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { IMovie, getPopular, makeImagePath } from '@/utils';

interface IPopularResponse {
  results: IMovie[];
}

const Popular = () => {
  const { data, isLoading, isError } = useQuery<IPopularResponse>(['popular'], getPopular);
  // console.log(data?.results);

  const navigate = useNavigate();
  const popularMatch = useMatch('/detail/:movieId');
  console.log(popularMatch?.pathname);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{isError}</h2>;
  }

  return (
    <>
      {data?.results?.map((popular) => (
        <div key={popular.id}>
          <img
            style={{ width: '160px', height: '200px' }}
            src={makeImagePath(popular.poster_path)}
            onClick={() => navigate(`/detail/${popular.id}`)}
          />
          <h3 key={popular.id}>{popular.original_title}</h3>
        </div>
      ))}
      <Outlet />
    </>
  );
};

const Home = () => {
  return <Popular />;
};

export default Home;
