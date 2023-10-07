import { IMovie, makeImagePath } from '@/utils';
import React from 'react';

const MovieDetail = ({ movie }: { movie: IMovie }) => {
  return (
    <div
      style={{
        position: 'absolute',
        width: '40vw',
        height: '80vh',
        left: '0',
        right: '0',
        margin: '0 auto',
        borderRadius: '15px',
        overflow: 'hidden',
        backgroundColor: 'black',
      }}
    >
      {movie && (
        <>
          <div
            style={{
              width: '100%',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              height: '400px',
              backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                movie.backdrop_path
              )})`,
            }}
          ></div>
          <h3
            style={{
              color: 'white',
              padding: '20px',
              fontSize: '46px',
              position: 'relative',
              top: '-80px',
            }}
          >
            {movie.title}
          </h3>
          <p
            style={{
              padding: '20px',
              position: 'relative',
              top: '-80px',
              color: 'white',
            }}
          >
            {movie.overview}
          </p>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
