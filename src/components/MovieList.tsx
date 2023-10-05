import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { IMovie, makeImagePath } from '@/utils';

interface IListProps<T> {
  dataKey: string;
  fetchData: () => Promise<T[]>;
}

export interface IMovieResponse {
  results: IMovie[];
}

export function MovieList<T>({ dataKey, fetchData }: IListProps<IMovie>) {
  const { data, isLoading, isError } = useQuery<IMovieResponse[]>([dataKey], fetchData);
  console.log(data?.results);

  const navigate = useNavigate();
  const location = useLocation();
  const currentLocation = location.pathname;

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
              onClick={() => navigate(`${currentLocation}/detail/${movie.id}`)}
            />
            <h3 key={movie.id}>{movie.original_title}</h3>
          </div>
        ))}
      <Outlet />
    </>
  );
}

export default MovieList;
