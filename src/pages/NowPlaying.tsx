import React from 'react';
import { Outlet, useLocation, useMatch, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { IMovie, getNowPlaying, makeImagePath } from '@/utils';

interface INowPlayingResponse {
  results: IMovie[];
}

function NowPlaying() {
  const { data, isLoading, isError } = useQuery<INowPlayingResponse>(['nowPlaying'], getNowPlaying);
  const navigate = useNavigate();
  const location = useLocation();
  const currentLocation = location.pathname;

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
                onClick={() => navigate(`${currentLocation}/detail/${nowPlaying.id}`)}
              />
              <h3 key={nowPlaying.id}>{nowPlaying.original_title}</h3>
            </div>
          ))}
        </>
      )}
      <Outlet />
    </>
  );
}

export default NowPlaying;
