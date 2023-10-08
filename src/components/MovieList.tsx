import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useGetMovies } from '@/hooks';
import { IListProps } from '@/hooks/useGetMovies';
import { IMovie, makeBgPath, makeImagePath } from '@/utils';
import { MovieDetail } from '.';

import styled from 'styled-components';

export function MovieList({ dataKey, fetchData }: IListProps) {
  const { data, isLoading, isError, getDetailPath, isOverlayVisible, clickedMovie } = useGetMovies({
    dataKey,
    fetchData,
  });
  const navigate = useNavigate();
  const topMovie = data?.results[0];
  return (
    <Wrapper>
      {isLoading && <Loader>Loading...</Loader>}
      {isError && <Loader>{isError}</Loader>}
      {!isLoading && !isError && (
        <>
          <Banner bgPhoto={makeBgPath(topMovie?.backdrop_path || '')}>
            <Title>{topMovie?.title}</Title>
            <Overview>{topMovie?.overview}</Overview>
          </Banner>
          <div>
            {data?.results?.map((movie: IMovie) => (
              <div key={movie.id}>
                <img
                  style={{ width: '160px', height: '200px' }}
                  src={makeImagePath(movie.poster_path)}
                  onClick={() => navigate(getDetailPath(movie.id))}
                />
                <h3 key={movie.id}>{movie.original_title}</h3>
              </div>
            ))}
          </div>
        </>
      )}
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
      <Outlet />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  /* background-color: red; */
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
`;

const Title = styled.h2`
  font-size: 65px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 26px;
  width: 50%;
`;

export default MovieList;
