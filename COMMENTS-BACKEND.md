# Comentários sobre a Arquitetura do Projeto 🚀

## Decisão da Arquitetura utilizada 🏗️

A arquitetura do projeto foi projetada com o foco em simplicidade, escalabilidade e eficiência. Utilizamos **Node.js** como ambiente de execução, **Express** como framework para a construção da API, e **Sequelize** como ORM para a interação com o banco de dados PostgreSQL. O uso de **Docker Compose** facilita a configuração e o gerenciamento do ambiente de desenvolvimento.

### Características principais da arquitetura:
- **Express** para criação de APIs RESTful.
- **Sequelize** para abstração das interações com o banco de dados.
- **PostgreSQL** como banco de dados relacional.
- **Rate Limiting** com **express-rate-limit** para proteger a API contra ataques de DDoS.
- **Docker Compose** para garantir um ambiente de desenvolvimento consistente.

## Lista de Bibliotecas de Terceiros utilizadas 📦

### Dependências:
- **bcryptjs**: Para criptografia de senhas e dados sensíveis 🔒.
- **cors**: Configuração de CORS para permitir requisições entre diferentes origens 🌐.
- **dotenv**: Gerenciamento de variáveis de ambiente 🗂️.
- **express-rate-limit**: Proteção contra abusos com limites de requisições ⏱️.
- **pg** e **pg-hstore**: Para interação com o banco de dados PostgreSQL 🏛️.
- **sequelize**: ORM para facilitar a manipulação de dados no banco de dados 🛠️.
- **validator**: Validação de dados, como emails e CPF 🧪.

### Dependências de Desenvolvimento:
- **@babel/core** e **@babel/preset-env**: Para transpilar código JavaScript 📜.
- **babel-jest**: Configuração para testar com Jest 🧪.
- **jest**: Framework de testes unitários para garantir a qualidade do código 🔬.
- **nodemon**: Reinicia o servidor automaticamente durante o desenvolvimento 🔄.
- **sequelize-cli**: Para gerenciar migrações e configurações do banco de dados 🔧.
- **supertest**: Para testes de integração nas rotas da API 🤖.
- **tsup** e **tsx**: Compiladores e ferramentas para execução de código TypeScript 💻.
- **typescript**: Linguagem de tipagem estática para melhorar a manutenção do código ⚡.

## Detalhes da Controller 🧑‍💻

As funções da controller foram desenhadas para implementar as operações CRUD do sistema de gestão de alunos.

### Funções Implementadas:
- **createStudent**: Cria um novo aluno na base de dados após validação dos dados 🆕.
- **getAllStudents**: Lista todos os alunos, com suporte a paginação e filtros 🔍.
- **getStudentById**: Retorna um aluno específico, com base no ID 📑.
- **updateStudent**: Atualiza os dados de um aluno existente 🔄.
- **deleteStudent**: Exclui um aluno da base de dados 🗑️.

## Detalhes da Migration 🛠️

A migration foi criada para definir a tabela `student` no banco de dados, com os seguintes campos:
- **id**: UUID, chave primária.
- **name**: Nome do aluno (obrigatório).
- **email**: Email do aluno (obrigatório).
- **cpf**: CPF do aluno (obrigatório).
- **ra**: RA do aluno (único, não editável).
- **created_at** e **updated_at**: Campos de controle de criação e atualização.

## Model `Student` 📚

A model `Student` foi configurada com Sequelize, onde os campos `name`, `email`, `cpf` e `ra` são definidos e garantem a integridade dos dados inseridos. A tabela do banco de dados está configurada para impedir dados duplicados no campo `ra`.

## Detalhes das Rotas 🚗

As rotas foram implementadas com Express para fornecer endpoints para o CRUD de alunos:

- **POST `/create`**: Criação de um novo aluno 🆕.
- **GET `/all`**: Listagem de todos os alunos 🔍.
- **GET `/list/:id`**: Detalhamento de um aluno específico 👤.
- **DELETE `/remove/:id`**: Exclui um aluno da base 🗑️.
- **PUT `/update/:id`**: Atualiza os dados de um aluno 🔄.

## Critérios de Aceite ✅

Aqui estão os critérios de aceite para as funcionalidades do sistema, que foram utilizados como base para desenvolvimento e testes:

### Cenário 1: Cadastrar Novo Aluno
- **Dado que estou na tela de Consulta de Alunos**, ao clicar em **Cadastrar Aluno**, a tela de Cadastro de Aluno é aberta.
- Os campos obrigatórios (nome, email, CPF, RA) são exibidos vazios.
- Ao inserir dados válidos e clicar em **Salvar**, o novo aluno é criado na base de dados e uma mensagem de sucesso é retornada.
- Ao clicar em **Cancelar**, retorna para a tela de Consulta de Alunos e os dados não são gravados.

### Cenário 2: Listar Alunos Cadastrados
- **Dado que estou no Módulo Acadêmico**, ao clicar no menu **Alunos**, a tela de Consulta de Alunos é aberta.
- A tela exibe a opção de **Cadastrar Aluno** no topo e lista os dados dos alunos cadastrados.
- É possível **editar** ou **excluir** um aluno diretamente da lista.

### Cenário 3: Editar Cadastro de Aluno
- **Dado que estou na listagem de alunos**, ao clicar em **Editar aluno**, a tela de Cadastro de Aluno é aberta com os campos preenchidos.
- É possível **editar** os campos editáveis (nome, email).
- Ao clicar em **Salvar**, os dados editados são atualizados na base.
- Ao clicar em **Cancelar**, retorna para a tela de Consulta de Alunos e os dados não são alterados.

### Cenário 4: Excluir Cadastro de Aluno
- **Dado que estou na listagem de alunos**, ao clicar em **Excluir aluno**, uma modal de confirmação é exibida.
- Se clicar em **Confirmar**, o aluno é excluído.
- Se clicar em **Cancelar**, a modal fecha e a exclusão não ocorre.

### Campos Obrigatórios:
- **Nome** (editável)
- **Email** (editável)
- **RA** (não editável, chave única)
- **CPF** (não editável)

## O que Você Melhoraria se Tivesse Mais Tempo ⏳

Com mais tempo, eu implementaria as seguintes melhorias:
- **Autenticação e Autorização**: Adicionar um sistema de autenticação para proteger as rotas da API e garantir que apenas usuários autorizados possam modificar dados sensíveis 🔑.
- **Validações de Dados**: Implementar validações mais robustas, como verificar a unicidade do RA e CPF antes de salvar um novo aluno 🧪.
- **Testes de Integração**: Expansão dos testes para cobrir todas as rotas e cenários de uso da API, garantindo que o sistema funcione corretamente como um todo 🤖.

## Quais Requisitos Obrigatórios que Não Foram Entregues 🚫

- **Autenticação de Usuários**: A implementação de um sistema de login e autenticação JWT está pendente 🔐.
- **Validações mais Estritas**: A validação de dados como o RA e CPF não está completamente implementada para garantir que os alunos com esses dados já não existam no banco 📛.
- **Testes de Integração**: O projeto não possui testes de integração completos para validar a interação entre os módulos frontend e backend 🤖.

## Considerações Finais 💬

O sistema está funcional e segue os principais critérios de aceite. No entanto, há melhorias e ajustes que podem ser feitos para garantir uma aplicação mais robusta e segura. Com a implementação das funcionalidades de autenticação e a validação de dados, o sistema estaria pronto para um uso mais amplo em produção 🚀.
