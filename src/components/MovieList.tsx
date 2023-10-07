import React from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { IMovieResponse, IMovie, makeImagePath } from '@/utils';

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
        <>
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
              {clickedMovie && (
                <>
                  <div
                    style={{
                      width: '100%',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center center',
                      height: '400px',
                      backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                        clickedMovie.backdrop_path
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
                    {clickedMovie.title}
                  </h3>
                  <p
                    style={{
                      padding: '20px',
                      position: 'relative',
                      top: '-80px',
                      color: 'white',
                    }}
                  >
                    {clickedMovie.overview}
                  </p>
                </>
              )}
            </div>
          </div>
        </>
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
