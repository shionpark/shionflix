import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { IMovie, getPopular, makeImagePath } from '@/utils';

interface IPopularResponse {
  results: IMovie[];
}

function Home() {
  const { data, isLoading, isError } = useQuery<IPopularResponse>(['popular'], getPopular);
  console.log(data?.results);

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {data?.results?.map((popular) => (
            <div key={popular.id}>
              <img
                style={{ width: '160px', height: '200px' }}
                src={makeImagePath(popular.poster_path)}
              />
              <h3 key={popular.id}>{popular.original_title}</h3>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default Home;
