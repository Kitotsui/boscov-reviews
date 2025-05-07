
import React from 'react';
import MovieCard from './MovieCard';
import { useNavigate } from 'react-router-dom';

export interface Movie {
  id: string;
  title: string;
  poster: string;
  year: number;
  director: string;
  rating?: number;
  genres: string[];
  duration: string;
}

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
}

const MovieGrid = ({ movies, loading = false }: MovieGridProps) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="animate-pulse bg-muted rounded-lg aspect-[2/3]"></div>
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-center">
        <div>
          <p className="text-lg font-medium mb-2">Nenhum filme encontrado</p>
          <p className="text-muted-foreground">Tente ajustar seus filtros ou busque por outro termo</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          {...movie}
          onClick={() => navigate(`/movie/${movie.id}`)}
        />
      ))}
    </div>
  );
};

export default MovieGrid;
