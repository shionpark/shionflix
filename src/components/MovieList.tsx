import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useGetMovies } from '@/hooks';
import { IListProps } from '@/hooks/useGetMovies';
import { IMovie, makeImagePath } from '@/utils';
import { MovieDetail } from '.';

export function MovieList({ dataKey, fetchData }: IListProps) {
  const { data, isLoading, isError, getDetailPath, isOverlayVisible, clickedMovie } = useGetMovies({
    dataKey,
    fetchData,
  });
  const navigate = useNavigate();
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
