import React from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
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
    return currentLocation === '/' ? `/movie/${movieId}` : `${currentLocation}/movie/${movieId}`;
  };

  const params = useParams();
  const isOverlayVisible = params.movieId !== undefined;

  return (
    <>
      {isOverlayVisible ? (
        <div
          style={{
            position: 'fixed',
            top: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            opacity: '1',
          }}
          onClick={() => navigate(-1)}
        ></div>
      ) : null}
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
