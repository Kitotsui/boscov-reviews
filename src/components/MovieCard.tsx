
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarIcon } from "lucide-react";

interface MovieCardProps {
  id: string;
  title: string;
  poster: string;
  year: number;
  director: string;
  rating?: number;
  genres: string[];
  duration: string;
  onClick?: () => void;
}

const MovieCard = ({ 
  id, 
  title, 
  poster, 
  year, 
  director, 
  rating, 
  genres, 
  duration,
  onClick 
}: MovieCardProps) => {
  return (
    <Card 
      className="overflow-hidden transition-all hover:shadow-lg cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <img 
          src={poster || '/placeholder.svg'} 
          alt={`${title} poster`}
          className="object-cover w-full h-full"
        />
        {rating !== undefined && (
          <div className="absolute top-2 right-2 bg-black/70 text-amber-400 rounded-full p-1 flex items-center text-sm font-medium">
            <StarIcon className="w-4 h-4 mr-1 fill-amber-400 stroke-amber-400" />
            <span>{rating.toFixed(1)}</span>
          </div>
        )}
      </div>
      <CardContent className="p-4 flex-grow">
        <h3 className="font-bold text-lg leading-tight mb-1 line-clamp-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{year} • {duration}</p>
        <p className="text-sm text-muted-foreground mb-2">Dir. {director}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {genres.slice(0, 2).map((genre) => (
            <Badge key={genre} variant="secondary" className="text-xs">
              {genre}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
