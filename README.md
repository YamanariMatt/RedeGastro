# RedeGastro — Protótipo


https://yamanarimatt.github.io/RedeGastro/


A RedeGastro é uma proposta de plataforma para conectar restaurantes, bares, cafeterias, pizzarias, hamburguerias, padarias, confeitarias, buffets, casas de eventos e outros negócios alimentícios a profissionais freelancers da gastronomia.

Slogan:

**A rede de talentos da gastronomia.**

## Aviso importante

Este repositório contém apenas um protótipo visual e navegável, desenvolvido com HTML, CSS e JavaScript puro.

A versão publicada no GitHub Pages não é um sistema funcional real.

Ela não possui:

- Backend
- Banco de dados
- Login real
- Autenticação Google real
- Pagamentos
- Contratações reais
- Armazenamento de dados
- Integração real com WhatsApp
- Validação real de documentos

Todos os dados exibidos são fictícios e usados apenas para demonstração.

> A versão publicada no GitHub Pages é apenas um protótipo visual e navegável. Nenhum dado é salvo, nenhum login é real e nenhuma contratação acontece por esta versão.

## Objetivo do protótipo

Validar a ideia visualmente com conhecidos, restaurantes e profissionais antes do desenvolvimento do MVP real.

O protótipo busca apresentar, de forma simples e navegável, como poderia funcionar uma plataforma para:

- Restaurantes encontrarem profissionais freelancers disponíveis;
- Profissionais criarem perfis públicos demonstrativos;
- Vagas urgentes, diárias, eventos e plantões serem divulgados;
- O contato inicial acontecer de forma rápida por WhatsApp;
- Restaurantes e profissionais visualizarem avaliações fictícias;
- A proposta da RedeGastro ser testada antes de qualquer desenvolvimento real.

## Posicionamento

A RedeGastro propõe conectar restaurantes a profissionais freelancers da gastronomia, com perfis avaliados, vagas urgentes, candidaturas e contato rápido pelo WhatsApp.

Nesta versão, todo esse fluxo é apenas simulado para fins de apresentação.

## Revisão visual

A interface do protótipo foi revisada para ficar mais limpa, moderna, responsiva e adequada ao contexto de gastronomia.

A revisão visual manteve a estrutura original do projeto e reforçou:

- Hierarquia mais clara no hero, listagens, dashboards e formulários;
- Cards, botões, filtros e avisos de protótipo com aparência mais consistente;
- Gradientes discretos e paleta escura quente, sem uso de preto puro como cor dominante;
- Animações suaves e foco visível para melhorar a experiência de navegação;
- Compatibilidade com GitHub Pages usando apenas HTML, CSS e JavaScript puro.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript puro

O projeto não utiliza React, Vue, Angular, Bootstrap, Tailwind, backend, banco de dados ou bibliotecas externas obrigatórias.

## Funcionalidades simuladas

- Listagem de profissionais
- Listagem de vagas
- Filtros
- Cards de profissionais
- Cards de vagas
- Perfis públicos
- Dashboards fictícios
- Painel administrativo fictício
- Formulários simulados
- Validação matemática de CPF
- Botões de WhatsApp com mensagem simulada
- Favoritos simulados com LocalStorage

## Como executar localmente

Como o projeto é feito apenas com HTML, CSS e JavaScript puro, basta abrir o arquivo `index.html` diretamente no navegador.

Também é possível usar uma extensão como Live Server no editor de código para visualizar o protótipo em um servidor local.

Exemplo com Live Server:

1. Abrir a pasta do projeto no editor;
2. Clicar com o botão direito no arquivo `index.html`;
3. Selecionar a opção para abrir com Live Server;
4. Navegar normalmente pelas páginas do protótipo.

## Como publicar no GitHub Pages

1. Criar um repositório no GitHub;
2. Enviar os arquivos do projeto para o repositório;
3. Acessar `Settings`;
4. Entrar em `Pages`;
5. Selecionar a branch `main`;
6. Selecionar a pasta `root`;
7. Salvar as configurações;
8. Aguardar o GitHub gerar o link público.

## Estrutura de pastas

O arquivo `index.html` fica na raiz porque o GitHub Pages carrega automaticamente esse arquivo como página inicial.

As demais páginas foram organizadas dentro da pasta `pages/` para manter o projeto mais limpo e estruturado.

Estrutura planejada:

```text
redegastro-prototipo/
├── index.html
├── README.md
├── pages/
│   ├── profissionais.html
│   ├── vagas.html
│   ├── perfil-profissional.html
│   ├── perfil-restaurante.html
│   ├── cadastro.html
│   ├── login.html
│   ├── dashboard-profissional.html
│   ├── dashboard-restaurante.html
│   ├── admin.html
│   ├── sobre.html
│   ├── termos.html
│   ├── privacidade.html
│   └── 404.html
├── assets/
│   ├── images/
│   │   ├── logo-redegastro.png
│   │   ├── favicon.png
│   │   └── og-image.png
│   └── icons/
│       └── placeholder.svg
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── utilities.css
└── js/
    ├── data.js
    ├── main.js
    ├── filters.js
    ├── forms.js
    └── ui.js
```

## Regras gerais do protótipo

- Todos os caminhos devem ser relativos e compatíveis com GitHub Pages;
- O `index.html` deve ficar sozinho na raiz do projeto;
- Todas as outras páginas HTML devem ficar dentro da pasta `pages/`;
- Assets devem ficar em `assets/`;
- CSS deve ficar em `css/`;
- JavaScript deve ficar em `js/`;
- Todas as páginas devem ter header e footer consistentes;
- Todas as páginas devem funcionar abrindo diretamente no navegador;
- Os dados usados no projeto devem ser fictícios;
- Formulários devem bloquear envio real e exibir mensagens de simulação;
- Nenhum dado sensível real deve ser informado no protótipo.

## Identidade visual

A identidade visual planejada para a RedeGastro segue uma proposta escura, gastronômica, acolhedora e profissional.

Paleta principal:

- Fundo principal espresso: `#2A160F`
- Fundo secundário café: `#3A2117`
- Fundo escuro marrom: `#1F120C`
- Card escuro: `#3B2418`
- Card elevado: `#4A2E20`
- Laranja principal: `#F97316`
- Laranja queimado: `#C2410C`
- Dourado avaliação: `#FACC15`
- Creme texto: `#FFF7ED`
- Bege texto secundário: `#D6C7B8`
- Texto apagado: `#A89483`
- Borda quente: `#5A3928`
- Verde status/disponível: `#22C55E`
- Vermelho alerta: `#EF4444`

## Próximos passos

- Criar backend real futuramente;
- Criar banco PostgreSQL;
- Implementar autenticação Google;
- Implementar perfis reais;
- Implementar sistema real de avaliações;
- Implementar painel administrativo real;
- Implementar LGPD e segurança;
- Validar modelo de monetização.

## Status

Protótipo em validação.
