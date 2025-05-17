import React from 'react';
import { Badge } from "@/components/ui/badge";

interface GenreFilterProps {
  genres: string[];
  selectedGenres: string[];
  onGenreToggle: (genre: string) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ 
  genres, 
  selectedGenres, 
  onGenreToggle 
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {genres.map(genre => (
        <Badge
          key={genre}
          variant={selectedGenres.includes(genre) ? "default" : "outline"}
          className="cursor-pointer hover:bg-primary/10"
          onClick={() => onGenreToggle(genre)}
        >
          {genre}
        </Badge>
      ))}
    </div>
  );
};

export default GenreFilter;
