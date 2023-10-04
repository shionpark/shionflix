import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { IMovie, getNowPlaying, makeImagePath } from '@/utils';

interface INowPlayingResponse {
  results: IMovie[];
}

function NowPlaying() {
  const { data, isLoading, isError } = useQuery<INowPlayingResponse>(['nowPlaying'], getNowPlaying);
  console.log(data?.results);

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {data?.results?.map((nowPlaying) => (
            <div key={nowPlaying.id}>
              <img
                style={{ width: '160px', height: '200px' }}
                src={makeImagePath(nowPlaying.poster_path)}
              />
              <h3 key={nowPlaying.id}>{nowPlaying.original_title}</h3>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default NowPlaying;
