import React, { useEffect, useState } from 'react';
import { IMovie, getComingSoon, makeImagePath } from '@/utils';

function ComingSoon() {
  const [popularMovies, setPopularMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    // 비동기 데이터 가져오기
    getComingSoon()
      .then((data) => {
        // 데이터를 받아와서 상태 변수에 저장
        setPopularMovies(data.results);
        console.log(data.results);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <h1>Coming Soon</h1>
      {popularMovies.map((movie) => (
        <div key={movie.id}>
          <img style={{ width: '160px', height: '200px' }} src={makeImagePath(movie.poster_path)} />
          <h3 key={movie.id}>{movie.original_title}</h3>
        </div>
      ))}
    </>
  );
}

export default ComingSoon;
