# Banco exclusivo — UBA Link Perfil

A integração Neon existente cria `LINK_PROFILE_DATABASE_DATABASE_URL`, também aceita pelo servidor. Não há fallback para `DATABASE_URL` ou `POSTGRES_URL`. Se as duas variáveis exclusivas estiverem presentes com valores diferentes, o servidor recusa a conexão. Não copie credenciais do Controles.

O UBA Link Perfil usa um banco Neon/PostgreSQL próprio. Ele não compartilha tabelas nem credenciais com UBA Controles ou UBA Revendedores.

## Responsabilidade deste banco

- contador público de alfajores vendidos;
- links do iFood, WhatsApp e YouTube;
- futuras configurações e conteúdos públicos do Link Perfil.

Clientes, pedidos, pagamentos, vendedores e estoque não pertencem a este banco.

## Variáveis do ambiente

```text
LINK_PROFILE_DATABASE_URL=<conexão exclusiva deste projeto>
LINK_PROFILE_ADMIN_SECRET=<segredo para alterações administrativas>
UBA_INTEGRATION_SECRET=<segredo compartilhado para comunicação entre sistemas>
```

O navegador pode apenas consultar `/api/content`. Alterações exigem segredo no servidor. Se outro sistema precisar atualizar um dado, ele usa a API autenticada; nunca recebe acesso direto a este banco.

## Ativação segura

1. Criar um Neon/PostgreSQL exclusivo.
2. Configurar as variáveis apenas no projeto Vercel `uba-link-perfil`.
3. Testar `/api/health` e `/api/content` na prévia.
4. Confirmar que a página mantém o conteúdo atual quando a API estiver temporariamente indisponível.
5. Publicar somente depois da aprovação.

Não há migração destrutiva: atualmente o site é estático e os valores existentes servem como conteúdo inicial do novo banco.
