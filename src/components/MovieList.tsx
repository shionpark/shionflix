import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useGetMovies } from '@/hooks';
import { IListProps } from '@/hooks/useGetMovies';
import { IMovie, makeBgPath, makeImagePath } from '@/utils';
import { MovieDetail } from '.';

import styled from 'styled-components';
import { motion } from 'framer-motion';

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
          <Slider>
            <Row>
              {data?.results?.slice(0, 6).map((movie: IMovie) => (
                <Box
                  key={movie.id}
                  bgPhoto={makeImagePath(movie.poster_path || '')}
                  onClick={() => navigate(getDetailPath(movie.id))}
                >
                  <Info>
                    <h3 key={movie.id}>{movie.original_title}</h3>
                  </Info>
                </Box>
              ))}
            </Row>
          </Slider>
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
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 65px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 26px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover; // 이미지 박스에 맞추기
  background-position: center center; // 이미지 박스 중앙
  height: 200px;
  cursor: pointer;
`;

const Info = styled.div``;

export default MovieList;
