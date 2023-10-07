import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { IMovieResponse, getPopular, makeImagePath } from '@/utils';

const Search = () => {
  const {
    state: { keyword },
  } = useLocation();

  console.log('search : ', keyword);

  const { data, isLoading, isError } = useQuery<IMovieResponse>(['popular'], getPopular);
  console.log(data);

  const navigate = useNavigate();
  const location = useLocation();
  const currentLocation = location.pathname;
  const getDetailPath = (movieId: number) => {
    return currentLocation === '/' ? `/movie/${movieId}` : `${currentLocation}/movie/${movieId}`;
  };

  return (
    <div>
      <h1 style={{ color: 'red' }}>검색 결과</h1>
      {data?.results
        .filter((movie) => (keyword ? movie.title.toLowerCase().includes(keyword) : true))
        .map((movie, index) => (
          <>
            <img
              style={{ width: '160px', height: '200px' }}
              src={makeImagePath(movie.poster_path)}
              onClick={() => navigate(getDetailPath(movie.id))}
            />
            <h1 key={index} style={{ color: 'red' }}>
              {movie.title}
            </h1>
          </>
        ))}
    </div>
  );
};

export default Search;
