import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { IMovie, getComingSoon, makeImagePath } from '@/utils';

interface IComingResponse {
  results: IMovie[];
}

function ComingSoon() {
  const { data, isLoading, isError } = useQuery<IComingResponse>(['coming'], getComingSoon);
  console.log(data?.results);

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {data?.results?.map((coming) => (
            <div key={coming.id}>
              <img
                style={{ width: '160px', height: '200px' }}
                src={makeImagePath(coming.poster_path)}
              />
              <h3 key={coming.id}>{coming.original_title}</h3>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default ComingSoon;
