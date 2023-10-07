import React from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { IMovieResponse, IMovie, makeImagePath } from '@/utils';
import { MovieDetail } from '.';

interface IListProps {
  dataKey: string;
  fetchData: () => Promise<IMovieResponse>;
}

export function MovieList({ dataKey, fetchData }: IListProps) {
  const { data, isLoading, isError } = useQuery<IMovieResponse>([dataKey], fetchData);

  const navigate = useNavigate();

  const location = useLocation();
  const currentLocation = location.pathname;
  const getDetailPath = (movieId: number) => {
    return currentLocation === '/' ? `/movie/${movieId}` : `${currentLocation}/movie/${movieId}`;
  };

  const params = useParams();
  const isOverlayVisible = params.movieId !== undefined;
  const clickedMovie =
    params.movieId && data?.results.find((moive: IMovie) => String(moive.id) === params.movieId);

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
        >
          overlay
          <MovieDetail movie={clickedMovie as IMovie} />
        </div>
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
