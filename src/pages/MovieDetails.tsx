import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import StarRating from '@/components/StarRating';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { useEffect } from 'react';

// tenho q fazer a API pra buscar os filmes e as avaliações
const mockMovies = [
  { id: "1", title: "Pulp Fiction", poster: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg", year: 1994, director: "Quentin Tarantino", genres: ["Crime", "Drama"], duration: "2h 34m", rating: 8.9, description: "As histórias de dois assassinos, um boxeador, um gângster e sua esposa, e um par de bandidos se entrelaçam neste conto de violência e redenção.", producer: "Miramax", classification: "18+", reviews: [
    { id: "r1", userId: "u1", userName: "Carlos Silva", rating: 5, comment: "Clássico absoluto do cinema. Diálogos brilhantes e atuações memoráveis.", date: "2023-10-15" },
    { id: "r2", userId: "u2", userName: "Ana Sousa", rating: 4, comment: "Roteiro não-linear genial. Tarantino no seu melhor.", date: "2023-09-22" },
    { id: "r3", userId: "u3", userName: "Ricardo Oliveira", rating: 5, comment: "Um dos melhores filmes já feitos. Cada cena é icônica.", date: "2023-11-03" }
  ] },
  { id: "2", title: "O Poderoso Chefão", poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg", year: 1972, director: "Francis Ford Coppola", genres: ["Crime", "Drama"], duration: "2h 55m", rating: 9.2, description: "Um clássico do cinema que narra a história da família Corleone.", producer: "Paramount", classification: "18+", reviews: [] },
  { id: "3", title: "O Cavaleiro das Trevas", poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg", year: 2008, director: "Christopher Nolan", genres: ["Ação", "Crime", "Drama"], duration: "2h 32m", rating: 9.0, description: "Batman enfrenta o caos em Gotham City.", producer: "Warner Bros", classification: "14+", reviews: [] },
  { id: "4", title: "A Lista de Schindler", poster: "https://br.web.img2.acsta.net/pictures/19/04/10/19/44/2904073.jpg", year: 1993, director: "Steven Spielberg", genres: ["Drama", "História"], duration: "3h 15m", rating: 9.0, description: "A história de Oskar Schindler, que salvou milhares de judeus durante o Holocausto.", producer: "Universal", classification: "16+", reviews: [] },
  { id: "5", title: "O Senhor dos Anéis: O Retorno do Rei", poster: "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg", year: 2003, director: "Peter Jackson", genres: ["Aventura", "Drama", "Fantasia"], duration: "3h 21m", rating: 9.0, description: "A conclusão da saga do Senhor dos Anéis.", producer: "New Line Cinema", classification: "12+", reviews: [] },
  { id: "6", title: "Forrest Gump", poster: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg", year: 1994, director: "Robert Zemeckis", genres: ["Drama", "Romance"], duration: "2h 22m", rating: 8.8, description: "A vida de Forrest Gump, um homem com um QI abaixo da média.", producer: "Paramount", classification: "14+", reviews: [] },
  { id: "7", title: "Interestelar", poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg", year: 2014, director: "Christopher Nolan", genres: ["Aventura", "Drama", "Ficção Científica"], duration: "2h 49m", rating: 8.6, description: "Um grupo de astronautas viaja pelo espaço para encontrar um novo lar para a humanidade.", producer: "Warner Bros", classification: "12+", reviews: [] },
  { id: "8", title: "Cidade de Deus", poster: "https://m.media-amazon.com/images/M/MV5BMGU5OWEwZDItNmNkMC00NzZmLTk1YTctNzVhZTJjM2NlZTVmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg", year: 2002, director: "Fernando Meirelles", genres: ["Crime", "Drama"], duration: "2h 10m", rating: 8.6, description: "A história de dois jovens que crescem em um bairro violento do Rio de Janeiro.", producer: "Miramax", classification: "18+", reviews: [] },
];

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [userRating, setUserRating] = React.useState(0);
  const [reviewComment, setReviewComment] = React.useState('');
  const { isLoggedIn } = useAuth();

  // Buscar o filme com base no ID
  const movie = mockMovies.find(m => m.id === id);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted review:", { rating: userRating, comment: reviewComment });
    // In a real app, we'd send this to the API
    // After submission, clear the form
    setUserRating(0);
    setReviewComment('');
    alert("Avaliação enviada com sucesso!");
  };

  if (!movie) {
    return <div>Filme não encontrado</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <div 
        className="w-full h-64 bg-cover bg-center relative"
        style={{ 
          backgroundImage: `url(${movie.poster})`,
          backgroundPosition: 'center 20%',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>
      
      <main className="container mx-auto max-w-7xl px-4 -mt-24 relative z-10">
        <Button 
          variant="outline" 
          size="sm" 
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
          <div>
            <div className="rounded-md overflow-hidden border shadow-lg">
              <img 
                src={movie.poster} 
                alt={`${movie.title} poster`}
                className="w-full h-auto"
              />
            </div>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
            
            <div className="flex items-center space-x-2 mb-4">
              <StarRating rating={movie.rating} maxRating={10} size="sm" />
              <span className="font-semibold text-amber-500">{movie.rating}/10</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres.map(genre => (
                <Badge key={genre} variant="secondary">{genre}</Badge>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mb-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{movie.year}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{movie.duration}</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>Dir. {movie.director}</span>
              </div>
              <div>
                <span className="px-2 py-0.5 bg-muted rounded text-xs font-medium">{movie.classification}</span>
              </div>
            </div>
            
            <p className="text-base mb-6">{movie.description}</p>
            
            <Separator className="my-6" />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Avaliações</h2>
              
              {isLoggedIn ? (
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmitReview}>
                      <div className="mb-4">
                        <label className="block mb-2 font-medium">Sua avaliação</label>
                        <StarRating 
                          rating={userRating} 
                          maxRating={5} 
                          onChange={setUserRating} 
                          size="lg" 
                          interactive={true} 
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block mb-2 font-medium">Comentário</label>
                        <Textarea 
                          placeholder="Escreva o que achou do filme..." 
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          rows={4}
                        />
                      </div>
                      
                      <Button type="submit" disabled={userRating === 0}>
                        Enviar Avaliação
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              ) : (
                <Card className="mb-6">
                  <CardContent className="py-6 flex flex-col items-center text-center">
                    <p className="mb-4">Faça login para deixar sua avaliação</p>
                    <Button onClick={() => navigate('/login')}>Entrar</Button>
                  </CardContent>
                </Card>
              )}
              
              {movie.reviews.length > 0 ? (
                <div className="space-y-4">
                  {movie.reviews.map(review => (
                    <Card key={review.id}>
                      <CardContent className="py-4">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{review.userName}</span>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="mb-2">
                          <StarRating rating={review.rating} size="sm" />
                        </div>
                        <p>{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p>Ainda não há avaliações para este filme.</p>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MovieDetails;
