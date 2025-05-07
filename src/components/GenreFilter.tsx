
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface GenreFilterProps {
  genres: string[];
  selectedGenres: string[];
  onGenreToggle: (genre: string) => void;
}

const GenreFilter = ({ genres, selectedGenres, onGenreToggle }: GenreFilterProps) => {
  return (
    <div className="mb-6">
      <h3 className="font-medium mb-2">Filtrar por Gênero</h3>
      <ScrollArea className="whitespace-nowrap pb-2" orientation="horizontal">
        <div className="flex gap-2">
          {genres.map((genre) => {
            const isSelected = selectedGenres.includes(genre);
            return (
              <Badge
                key={genre}
                variant={isSelected ? "default" : "outline"}
                className={`cursor-pointer ${isSelected ? "bg-primary" : ""}`}
                onClick={() => onGenreToggle(genre)}
              >
                {genre}
              </Badge>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default GenreFilter;
