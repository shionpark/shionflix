import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useGetMovies } from '@/hooks';
import { IListProps } from '@/hooks/useGetMovies';
import { IMovie, makeBgPath, makeImagePath } from '@/utils';
import { MovieDetail } from '.';

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5, // 처음과 끝을 조금 떼어주기 위해 -5 (아니면 슬라이드 바뀔 때 서로 붙어있음)
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: 'tween',
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: 'tween',
    },
  },
};

export function MovieList({ dataKey, fetchData }: IListProps) {
  const { data, isLoading, isError, getDetailPath, isOverlayVisible, clickedMovie } = useGetMovies({
    dataKey,
    fetchData,
  });
  const navigate = useNavigate();
  const topMovie = data?.results[0];

  const SLIDE_OFFSET = 6;
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const TOTAL_MOVIES = data.results.length - 1;
      const MAX_INDEX = Math.floor(TOTAL_MOVIES / SLIDE_OFFSET) - 1;
      setIndex((prev) => (prev === MAX_INDEX ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <Wrapper>
      {isLoading && <Loader>Loading...</Loader>}
      {isError && <Loader>{isError}</Loader>}
      {!isLoading && !isError && (
        <>
          <Banner onClick={increaseIndex} bgPhoto={makeBgPath(topMovie?.backdrop_path || '')}>
            <Title>{topMovie?.title}</Title>
            <Overview>{topMovie?.overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: 'tween', duration: 1 }} // 튕기는 거 없애줌 spring 아니고 linear
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(SLIDE_OFFSET * index, SLIDE_OFFSET * index + SLIDE_OFFSET)
                  .map((movie: IMovie) => (
                    <Box
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      transition={{ type: 'tween' }}
                      bgPhoto={makeImagePath(movie.poster_path || '')}
                      onClick={() => navigate(getDetailPath(movie.id))}
                    >
                      <Info variants={infoVariants}>
                        <h4 key={movie.id}>{movie.original_title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
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
  padding-bottom: 200px;
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
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
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
  // scale up 화면 밖으로 넘어가지 않도록
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;
export default MovieList;
