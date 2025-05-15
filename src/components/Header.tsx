import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserCircle, Search, FilmIcon } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { jwtDecode } from 'jwt-decode';

interface HeaderProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
  isLoggedIn?: boolean;
}

const Header = ({ onSearch, searchQuery = '', isLoggedIn = false }: HeaderProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState(searchQuery);
  const { logout, token } = useAuth();
  let userName = '';
  if (isLoggedIn && token) {
    try {
      const decoded: any = jwtDecode(token);
      userName = decoded.nome || decoded.email;
    } catch {}
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <header className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3">
      <div className="container mx-auto max-w-7xl flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2 mr-6">
            <FilmIcon className="h-6 w-6" />
            <span className="font-bold text-lg hidden sm:inline">BoscovFilmes</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-sm font-medium hover:text-primary">
              Início
            </Link>
            <Link to="/top-rated" className="text-sm font-medium hover:text-primary">
              Mais Avaliados
            </Link>
            <Link to="/genres" className="text-sm font-medium hover:text-primary">
              Gêneros
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-2">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Input
              type="search"
              placeholder="Buscar filmes..."
              className="w-[200px] lg:w-[300px]"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              variant="ghost" 
              className="absolute right-0 top-0 h-full"
              size="icon"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
          
          {isLoggedIn ? (
            <>
              {userName && (
                <span className="hidden md:inline text-sm text-muted-foreground mr-2">Bem-vindo, {userName}</span>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/profile')}
                className="rounded-full"
              >
                <UserCircle className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => { logout(); navigate('/login'); }}
              >
                Sair
              </Button>
            </>
          ) : (
            <Button onClick={() => navigate('/login')}>Entrar</Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
