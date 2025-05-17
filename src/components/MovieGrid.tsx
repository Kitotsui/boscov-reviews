import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";

export interface Movie {
  id: string;
  title: string;
  poster: string;
  year: number;
  director: string;
  duration: string;
  genres: string[];
  avaliacoes?: { nota: number }[];
}

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="animate-pulse">
              <div className="aspect-[2/3] bg-gray-200" />
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map(movie => {
        // Calcular média das avaliações
        let media = null;
        if (movie.avaliacoes && movie.avaliacoes.length > 0) {
          const soma = movie.avaliacoes.reduce((acc, av) => acc + av.nota, 0);
          media = (soma / movie.avaliacoes.length).toFixed(1);
        }
        return (
          <Link key={movie.id} to={`/filmes/${movie.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[2/3] relative">
                <img 
                  src={movie.poster} 
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                {media && (
                  <div className="absolute top-2 right-2 bg-black/80 text-amber-400 text-xs font-bold px-2 py-1 rounded flex items-center gap-1 shadow">
                    <span>{media}</span>
                    <span>★</span>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-1 line-clamp-1">{movie.title}</h3>
                <p className="text-sm text-muted-foreground">{movie.year}</p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default MovieGrid;
