import React, { useState } from 'react';
import Header from '@/components/Header';
import MovieGrid, { Movie } from '@/components/MovieGrid';
import GenreFilter from '@/components/GenreFilter';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/providers/AuthProvider';
import { jwtDecode } from 'jwt-decode';


const mockGenres = ["Ação", "Aventura", "Animação", "Comédia", "Crime", "Documentário", "Drama", "Família", "Fantasia", "História", "Terror", "Música", "Mistério", "Romance", "Ficção Científica", "Thriller", "Guerra", "Faroeste"];

const mockMovies: Movie[] = [
  {
    id: "1",
    title: "Pulp Fiction",
    poster: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    year: 1994,
    director: "Quentin Tarantino",
    rating: 8.9,
    genres: ["Crime", "Drama"],
    duration: "2h 34m",
  },
  {
    id: "2",
    title: "O Poderoso Chefão",
    poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    year: 1972,
    director: "Francis Ford Coppola",
    rating: 9.2,
    genres: ["Crime", "Drama"],
    duration: "2h 55m",
  },
  {
    id: "3",
    title: "O Cavaleiro das Trevas",
    poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    year: 2008,
    director: "Christopher Nolan",
    rating: 9.0,
    genres: ["Ação", "Crime", "Drama"],
    duration: "2h 32m",
  },
  {
    id: "4",
    title: "A Lista de Schindler",
    poster: "https://br.web.img2.acsta.net/pictures/19/04/10/19/44/2904073.jpg",
    year: 1993,
    director: "Steven Spielberg",
    rating: 9.0,
    genres: ["Drama", "História"],
    duration: "3h 15m",
  },
  {
    id: "5",
    title: "O Senhor dos Anéis: O Retorno do Rei",
    poster: "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    year: 2003,
    director: "Peter Jackson",
    rating: 9.0,
    genres: ["Aventura", "Drama", "Fantasia"],
    duration: "3h 21m",
  },
  {
    id: "6",
    title: "Forrest Gump",
    poster: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
    year: 1994,
    director: "Robert Zemeckis",
    rating: 8.8,
    genres: ["Drama", "Romance"],
    duration: "2h 22m",
  },
  {
    id: "7",
    title: "Interestelar",
    poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    year: 2014,
    director: "Christopher Nolan",
    rating: 8.6,
    genres: ["Aventura", "Drama", "Ficção Científica"],
    duration: "2h 49m",
  },
  {
    id: "8",
    title: "Cidade de Deus",
    poster: "https://m.media-amazon.com/images/M/MV5BMGU5OWEwZDItNmNkMC00NzZmLTk1YTctNzVhZTJjM2NlZTVmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    year: 2002,
    director: "Fernando Meirelles",
    rating: 8.6,
    genres: ["Crime", "Drama"],
    duration: "2h 10m",
  },
];

const Index = () => {
  const { isLoggedIn, token } = useAuth();
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('recent');
  const [filteredMovies, setFilteredMovies] = useState(mockMovies);
  let userEmail = '';
  if (isLoggedIn && token) {
    try {
      const decoded: any = jwtDecode(token);
      userEmail = decoded.email;
    } catch {}
  }

  // Filter movies based on selected genres and search query
  React.useEffect(() => {
    let result = mockMovies;
    
    // Filter by genre if any selected
    if (selectedGenres.length > 0) {
      result = result.filter(movie => 
        movie.genres.some(genre => selectedGenres.includes(genre))
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(movie => 
        movie.title.toLowerCase().includes(query) || 
        movie.director.toLowerCase().includes(query)
      );
    }
    
    // Sort based on active tab
    if (activeTab === 'top-rated') {
      result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (activeTab === 'recent') {
      result = [...result].sort((a, b) => b.year - a.year);
    }
    
    setFilteredMovies(result);
  }, [selectedGenres, searchQuery, activeTab]);

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre) 
        : [...prev, genre]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} isLoggedIn={isLoggedIn} />
      
      <main className="container mx-auto max-w-7xl p-4 md:p-6 flex-grow">
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Descubra Filmes</h1>
          
          <GenreFilter 
            genres={mockGenres} 
            selectedGenres={selectedGenres} 
            onGenreToggle={handleGenreToggle} 
          />
          
          <div className="flex justify-between items-center mb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="recent">Recentes</TabsTrigger>
                <TabsTrigger value="top-rated">Mais Avaliados</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <Separator className="mb-6" />
          
          <MovieGrid movies={filteredMovies} />
        </section>
      </main>
    </div>
  );
};

export default Index;
