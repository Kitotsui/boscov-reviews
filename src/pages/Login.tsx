import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FilmIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/providers/AuthProvider';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login: authLogin, isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("login");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
  });

  const [registerErrors, setRegisterErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginForm.email,
          senha: loginForm.password,
        })
      });
      setIsLoading(false);
      if (response.status === 200) {
        const data = await response.json();
        authLogin(data.token);
        toast({
          title: "Login com sucesso",
          description: "Bem-vindo(a) de volta!",
        });
        navigate('/');
      } else {
        const data = await response.json();
        let errorMsg = 'Erro desconhecido';
        if (Array.isArray(data.error)) {
          errorMsg = data.error.map((e: any) => e.message).join(' | ');
        } else if (typeof data.error === 'object' && data.error?.message) {
          errorMsg = data.error.message;
        } else if (typeof data.error === 'string') {
          errorMsg = data.error;
        }
        toast({
          title: "Erro ao entrar",
          description: errorMsg,
          variant: "destructive",
        });
      }
    } catch (err) {
      setIsLoading(false);
      toast({
        title: "Erro ao entrar",
        description: "Erro de conexão com o servidor",
        variant: "destructive",
      });
    }
  };

  function validateRegisterForm() {
    const errors: {[key: string]: string} = {};
    if (!registerForm.name || registerForm.name.trim().length < 2) {
      errors.name = 'O nome deve ter pelo menos 2 caracteres';
    }
    if (!registerForm.email || !/^\S+@\S+\.\S+$/.test(registerForm.email)) {
      errors.email = 'E-mail inválido';
    }
    if (!registerForm.password || registerForm.password.length < 6) {
      errors.password = 'A senha deve ter pelo menos 6 caracteres';
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      errors.confirmPassword = 'As senhas não coincidem';
    }
    if (!registerForm.birthDate || isNaN(Date.parse(registerForm.birthDate))) {
      errors.birthDate = 'Data de nascimento inválida';
    }
    return errors;
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateRegisterForm();
    setRegisterErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: registerForm.name,
          email: registerForm.email,
          senha: registerForm.password,
          dataNascimento: registerForm.birthDate,
        })
      });
      setIsLoading(false);
      if (response.status === 201) {
        toast({
          title: "Cadastro realizado",
          description: "Sua conta foi criada com sucesso!",
        });
        setActiveTab("login");
      } else {
        const data = await response.json();
        toast({
          title: "Erro de cadastro",
          description: data.error ? data.error : 'Erro desconhecido',
          variant: "destructive",
        });
      }
    } catch (err) {
      setIsLoading(false);
      toast({
        title: "Erro de cadastro",
        description: "Erro de conexão com o servidor",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/40 p-4">
      <Link to="/" className="flex items-center mb-6">
        <FilmIcon className="h-8 w-8 mr-2" />
        <span className="text-2xl font-bold">BoscovFilmes</span>
      </Link>
      
      <Card className="w-full max-w-md">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="register">Criar Conta</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLoginSubmit}>
              <CardHeader>
                <CardTitle>Entrar</CardTitle>
                <CardDescription>
                  Entre com sua conta para avaliar e comentar sobre filmes
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="seu@email.com" 
                    required
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Senha</Label>
                    <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    required
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  />
                </div>
              </CardContent>
              
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegisterSubmit}>
              <CardHeader>
                <CardTitle>Criar Conta</CardTitle>
                <CardDescription>
                  Crie sua conta para começar a avaliar filmes
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input 
                    id="name" 
                    placeholder="Seu nome completo" 
                    required
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                  />
                  {registerErrors.name && <span className="text-red-500 text-xs">{registerErrors.name}</span>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input 
                    id="register-email" 
                    type="email" 
                    placeholder="seu@email.com" 
                    required
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                  />
                  {registerErrors.email && <span className="text-red-500 text-xs">{registerErrors.email}</span>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-password">Senha</Label>
                  <Input 
                    id="register-password" 
                    type="password" 
                    required
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                  />
                  {registerErrors.password && <span className="text-red-500 text-xs">{registerErrors.password}</span>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Senha</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    required
                    value={registerForm.confirmPassword}
                    onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                  />
                  {registerErrors.confirmPassword && <span className="text-red-500 text-xs">{registerErrors.confirmPassword}</span>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="birth-date">Data de Nascimento</Label>
                  <Input
                    id="birth-date"
                    type="date"
                    required
                    value={registerForm.birthDate}
                    onChange={(e) => setRegisterForm({...registerForm, birthDate: e.target.value})}
                  />
                  {registerErrors.birthDate && <span className="text-red-500 text-xs">{registerErrors.birthDate}</span>}
                </div>
              </CardContent>
              
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Criando conta..." : "Criar Conta"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Login;
