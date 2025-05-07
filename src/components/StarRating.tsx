
import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  onChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  onChange,
  size = 'md',
  interactive = false,
  className = ''
}) => {
  const [hoverRating, setHoverRating] = React.useState(0);
  
  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index);
    }
  };

  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }[size];

  const containerClass = `flex ${className}`;
  const starClass = `${sizeClass} ${interactive ? 'cursor-pointer' : ''}`;

  return (
    <div className={containerClass}>
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = interactive 
          ? starValue <= (hoverRating || rating)
          : starValue <= Math.round(rating);
        
        return (
          <Star
            key={index}
            className={starClass}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            fill={isFilled ? 'currentColor' : 'none'}
            color={isFilled ? '#f59e0b' : '#d1d5db'}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
