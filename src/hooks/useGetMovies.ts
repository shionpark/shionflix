import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { IMovieResponse, IMovie } from '@/utils';

export interface IListProps {
  dataKey: string;
  fetchData: () => Promise<IMovieResponse>;
}

const useGetMovies = ({ dataKey, fetchData }: IListProps) => {
  const { data, isLoading, isError } = useQuery<IMovieResponse>([dataKey], fetchData);

  const location = useLocation();
  const currentLocation = location.pathname;
  const getDetailPath = (movieId: number) => {
    return currentLocation === '/' ? `/movie/${movieId}` : `${currentLocation}/movie/${movieId}`;
  };

  const params = useParams();
  const isOverlayVisible = params.movieId !== undefined;
  const clickedMovie =
    params.movieId && data?.results.find((moive: IMovie) => String(moive.id) === params.movieId);
  return {
    data,
    isLoading,
    isError,
    getDetailPath,
    isOverlayVisible,
    clickedMovie,
  };
};

export default useGetMovies;
