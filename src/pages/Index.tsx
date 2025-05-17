import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MovieGrid, { Movie } from '@/components/MovieGrid';
import GenreFilter from '@/components/GenreFilter';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/providers/AuthProvider';
import { jwtDecode } from 'jwt-decode';

interface Genero {
  id: number;
  descricao: string;
}

interface Filme {
  id: number;
  nome: string;
  poster: string;
  anoLancamento: number;
  diretor: string;
  duracao: number;
  generos: {
    genero: {
      id: number;
      descricao: string;
    };
  }[];
  avaliacoes?: { nota: number }[];
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('recent');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genero[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:3001/filmes');
        const data = await response.json();
        setMovies(data.map((filme: Filme) => ({
          id: filme.id.toString(),
          title: filme.nome,
          poster: filme.poster,
          year: filme.anoLancamento,
          director: filme.diretor,
          duration: `${Math.floor(filme.duracao / 60)}h ${filme.duracao % 60}m`,
          genres: filme.generos.map(g => g.genero.descricao),
          avaliacoes: filme.avaliacoes?.map(av => ({ nota: av.nota }))
        })));
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await fetch('http://localhost:3001/generos');
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error('Erro ao buscar gêneros:', error);
      }
    };

    fetchMovies();
    fetchGenres();
  }, []);

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenres = selectedGenres.length === 0 || 
      selectedGenres.some(genre => movie.genres.includes(genre));
    return matchesSearch && matchesGenres;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} isLoggedIn={isLoggedIn} />
      
      <main className="container mx-auto max-w-7xl p-4 md:p-6 flex-grow">
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Descubra Filmes</h1>
          
          <GenreFilter 
            genres={genres?.map(g => g.descricao) || []} 
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
          
          <MovieGrid movies={filteredMovies} loading={loading} />
        </section>
      </main>
    </div>
  );
};

export default Index;
