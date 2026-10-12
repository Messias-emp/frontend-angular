# 🛍️ E-Commerce Store (Angular)

Aplicação web moderna de e-commerce desenvolvida em **Angular** (Standalone Components), consumindo uma API REST em Spring Boot. O projeto conta com rotas protegidas por Guards, interceptores HTTP para injeção automática de tokens JWT, gerenciamento reativo de estado e design responsivo.

---

## 🚀 Tecnologias Utilizadas

- **Angular 18+** (Standalone Components & Signals/RxJS)
- **TypeScript**
- **Tailwind CSS / CSS Moderno**
- **RxJS** (Programação reativa para estados globais e carrinho)
- **JWT Decode** (Manipulação e leitura de claims de tokens no client-side)
- **Vercel** (Hospedagem e CI/CD contínuo)

---

## ✨ Funcionalidades

- **Catálogo de Produtos**: Listagem dinâmica consumindo a API REST.
- **Autenticação Segura**: Telas de Login e Registro integradas com JWT.
- **Controle de Acesso por Perfil**: Redirecionamento automático e proteção de rotas para clientes e administradores.
- **Gestão de Pedidos**: Acompanhamento de pedidos do usuário logado (`Meus Pedidos`) e fluxo de checkout.
- **Tratamento de Erros**: Interceptadores globais para falhas de rede e sessão expirada.

---

## 📦 Como Executar o Projeto Localmente

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Execute o servidor de desenvolvimento:
   ```bash
   ng serve
   ```
3. Acesse no navegador: `http://localhost:4200`
