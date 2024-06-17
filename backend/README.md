# API Clinicorp

## Descrição

API responsável por gerir um sistema de controle de tarefas, onde o
usuário poderá criar novos projetos e adicionar tarefas ao projeto.
Cada tarefa tem dois tipos de *STATUS* [*PENDING*, *COMPLETED*].
O usuário precisa fazer um cadastro para conseguir acessar o sistema

## Detalhes de como montar o ambiente

* Instalar o Node JS caso não tenha, [Node JS link](https://nodejs.org/en/download/package-manager/)
* Versão do Node JS utilizada: 20.14.0
* Renomei o arquivo .env.local para .env
* Pode ser usado o NPM, YARN ou PNPM para gerenciar as depencias e executar o projeto
* Instalar o Docker [Docker link](https://docs.docker.com/desktop/install/windows-install/)
* Instalar o Docker composer [Docker Compose Link](https://docs.docker.com/compose/install/)
* Efetue a instalação do **node_modules** usando **npm install**,
**yarn** ou **pnpm i**
* Executar o comando **docker-compose up -d** para criar o container com o Docker
* Executar o commando **npm run seed**, **yarn seed** ou **pnpm run seed**
* Execute o commando **npm run test**, **yarn test** ou
**pnpm run test** para rodar os testes unitários
* Para executar os testes será necessário ter o banco iniciado
no docker ou passar o novo endereço e credencias dentro do **.env**

## Tecnologias usadas

* MondoDB
* NodeJS
* Express
* Mongoose
* Zod
* Jwt
* Vitest
* Ratelimit
* Helmet

## Detalhes sobre a API

* Efetuar o cadastro do usuário para recuperar o token e acessar as rotas
* Respostas de Sucesso
  * true
  * Status Code 200
  * Status Code 201
  * Status Code 204
* Respostas de Erro
  * messagem(String)
  * Status Code 401 (Usuário não autorizado)
  * Status Code 400 (parâmetros faltando)
  * Status Code 404 (conteúdo não encontrado)
  * Status Code 500 para erro interno

## Estrura base do projeto

* Pasta **main** dentro da **src** inicia o servidor
* Pasta **shared** contém arquivos que são utilizados em várioas níveis do projeto

## Informações sobre o projeto

* A estrutura do projeto segue um padão MVC de três níveis de
separação usando DTO e repository para gerenciar o acesso ao banco e
objetos para trasitar os dados entre as camandas
* Padrão repository para gerenciar os acessos ao banco
* MVC
* DIP - [Dependency inversion principle](https://medium.com/@tbaragao/solid-d-i-p-dependency-inversion-principle-e87527f8d0be)
* Singleto - [Padrão criacional](https://refactoring.guru/design-patterns/singleton)

## Melhorias

* Usar o PM2 para gerenciar a instância do NodeJS que irá rodar no servidor
