# PassouScanner

Monorepo com backend (.NET), web (React) e mobile (Expo).

## Estrutura

```
apps/
├── backend/PassouScanner/
│   ├── PassouScanner.Api/              # controllers, middlewares, JWT, Program.cs
│   ├── PassouScanner.Domain/           # entidades, enums, interfaces de repositório
│   ├── PassouScanner.Domain.AppService/# services, DTOs, validators, mappings
│   ├── PassouScanner.Domain.Data/      # DbContext, configurations, repositórios, migrations, seed
│   └── PassouScanner.IoC/              # injeção de dependência
├── web/src/
│   ├── api/                            # client HTTP + um arquivo por recurso
│   ├── components/crud/                # base genérica de CRUD
│   ├── hooks/                          # hooks de React Query por recurso
│   ├── pages/                          # uma pasta por tela
│   └── store/                          # auth (TanStack Store)
└── mobile/                             # app Expo

packages/                               # reservado pra código compartilhado (vazio por enquanto)
```
