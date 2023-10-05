import React from 'react';
import { Outlet, useLocation, useMatch, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { IMovie, getComingSoon, makeImagePath } from '@/utils';

interface IComingResponse {
  results: IMovie[];
}

function ComingSoon() {
  const { data, isLoading, isError } = useQuery<IComingResponse>(['coming'], getComingSoon);
  // console.log(data?.results);

  const navigate = useNavigate();
  const popularMatch = useMatch('/detail/:movieId');
  // console.log(popularMatch?.pathname);
  const location = useLocation();
  const currentLocation = location.pathname;
  // console.log(currentLocation);

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
                onClick={() => navigate(`${currentLocation}/detail/${coming.id}`)}
              />
              <h3 key={coming.id}>{coming.original_title}</h3>
            </div>
          ))}
        </>
      )}
      <Outlet />
    </>
  );
}

export default ComingSoon;
