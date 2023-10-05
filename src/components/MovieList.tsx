import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { IMovieResponse, IMovie, makeImagePath } from '@/utils';

interface IListProps {
  dataKey: string;
  fetchData: () => Promise<[]>;
}

export function MovieList({ dataKey, fetchData }: IListProps) {
  const { data, isLoading, isError } = useQuery<IMovieResponse[]>([dataKey], fetchData);

  const navigate = useNavigate();
  const location = useLocation();
  const currentLocation = location.pathname;

  const getDetailPath = (movieId: number) => {
    return currentLocation === '/' ? `/detail/${movieId}` : `${currentLocation}/detail/${movieId}`;
  };

  return (
    <>
      {isLoading && <h2>Loading...</h2>}
      {isError && <h2>{isError}</h2>}
      {!isLoading &&
        !isError &&
        data?.results?.map((movie: IMovie) => (
          <div key={movie.id}>
            <img
              style={{ width: '160px', height: '200px' }}
              src={makeImagePath(movie.poster_path)}
              onClick={() => navigate(getDetailPath(movie.id))}
            />
            <h3 key={movie.id}>{movie.original_title}</h3>
          </div>
        ))}
      <Outlet />
    </>
  );
}

export default MovieList;
