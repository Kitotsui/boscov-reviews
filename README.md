# BoscovFilmes

Bem-vindo ao projeto **BoscovFilmes**!

Este repositório contém o código-fonte de um aplicativo web desenvolvido com **Vite**, **TypeScript**, **React**, **shadcn-ui** e **Tailwind CSS**.

---

🚀 Como editar este código

1. Usando sua IDE preferida

2. Clone o repositório:
   git clone https://github.com/Kitotsui/boscov-reviews.git
   cd boscov-reviews

3. Instale as dependências:
   npm install

4. Crie o arquivo .env na raiz do projeto.

5. Se houver alguma alteração no schema do Prisma, executar:
   npx prisma migrate dev

   Caso o banco não esteja populado ainda, executar:
   
   !ATENÇÃO, O COMANDO A SEGUIR IRÁ LIMPAR O BANCO!
   
   npx prisma db seed

7. Inicie o servidor de desenvolvimento:
   npm run dev para o frontend
   npm run dev:server para o backend

   Isso iniciará o projeto em modo de desenvolvimento com recarregamento automático.

---

🛠 Tecnologias utilizadas

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

---

📦 Como implantar este projeto

1. Crie a versão de produção:
   npm run build

2. Faça o deploy enviando a pasta `dist/` (ou o diretório configurado) para o serviço de sua preferência, por exemplo:

   - Netlify
   - Vercel
   - GitHub Pages
   - AWS S3

---
