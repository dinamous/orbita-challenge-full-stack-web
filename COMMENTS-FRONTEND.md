# 📚 Descrição do Projeto: Gerenciamento de Alunos

Este é um projeto de gerenciamento de alunos, desenvolvido com **Vue.js 3** no frontend e **Node.js** no backend. A aplicação oferece funcionalidades de **CRUD (Criar, Ler, Atualizar, Deletar)** para o gerenciamento de dados de alunos e uma interface interativa e amigável para os usuários.

## 🛠 Funcionalidades

### Backend 🔧

- **Operações CRUD**: A API permite realizar operações de criação, leitura, atualização e remoção de alunos.
- **Persistência de Dados**: O backend mantém os dados dos alunos em um banco de dados.
- **API RESTful**: Fornece endpoints para o frontend interagir com os dados dos alunos usando requisições HTTP (GET, POST, PUT, DELETE).

### Frontend 🌐

- **Cadastro e Edição de Alunos**: O usuário pode adicionar novos alunos ou editar informações de alunos existentes, como nome, e-mail, CPF e RA.
- **Listagem de Alunos**: Todos os alunos cadastrados são exibidos em uma tabela, com a possibilidade de editar ou remover qualquer aluno.
- **Busca e Filtros**: A aplicação permite buscar e filtrar alunos com base em critérios como nome, e-mail ou RA.
- **Paginador**: A listagem de alunos é paginada, o que melhora a usabilidade ao lidar com grandes volumes de dados.
- **Feedback de Ações**: O sistema fornece mensagens claras de sucesso ou erro após cada operação (criação, edição ou remoção de alunos).
- **Integração com API**: O frontend consome a API RESTful do backend para realizar as operações CRUD.

### Gerenciamento de Estado com Pinia 💾

- **Estado Centralizado**: Utiliza o Pinia para gerenciar o estado global da aplicação, incluindo a lista de alunos, o estado de carregamento, mensagens de sucesso ou erro, e o gerenciamento da página ativa da listagem.
- **Reatividade**: As mudanças no estado são refletidas automaticamente na interface, oferecendo uma experiência de usuário fluida e dinâmica.

## 📋 Estrutura do Projeto

### Backend 🖥

O backend foi desenvolvido utilizando o **Node.js** com o framework **Express**, fornecendo uma API RESTful para gerenciar as operações CRUD sobre os dados dos alunos. A comunicação com o banco de dados é feita por meio de bibliotecas como **express** com o banco de dados **express**.

### Frontend 💻

O frontend foi desenvolvido com **Vue.js 3**, aproveitando a simplicidade e flexibilidade do Vue. Utiliza o **Pinia** para o gerenciamento do estado e o **Vuetify** para uma interface bonita e funcional. As operações CRUD são feitas através de requisições HTTP para o backend, utilizando a biblioteca **axios** para facilitar a comunicação entre o frontend e o backend.

### Fluxo de Dados 🔄

1. **Requisições do Frontend**: O frontend faz chamadas para a API RESTful do backend, passando os dados necessários (por exemplo, informações do aluno) e recebendo as respostas.
2. **Manipulação dos Dados**: O backend processa as requisições, manipulando o banco de dados conforme necessário (adicionar, editar ou remover alunos).
3. **Atualização do Frontend**: Após cada operação, o frontend é atualizado com as informações mais recentes, refletindo as mudanças feitas no backend.

## 📈 Benefícios

- **Fácil Manutenção**: A separação clara entre frontend e backend facilita a manutenção e evolução do sistema.
- **Escalabilidade**: A arquitetura baseada em API RESTful permite que o sistema cresça facilmente, com a possibilidade de adicionar novas funcionalidades no futuro, como autenticação, relatórios, etc.
- **Experiência de Usuário Aprimorada**: A interface interativa, com feedbacks claros e uma navegação simples, proporciona uma boa experiência ao usuário.
- **Reatividade**: O uso de Vue.js e Pinia garante que as alterações no estado da aplicação sejam refletidas instantaneamente na interface, sem a necessidade de recarregar a página.

## ⚙️ Tecnologias Utilizadas

- **Frontend**: 
  - **Vue.js 3** para o desenvolvimento do frontend.
  - **Pinia** para o gerenciamento do estado da aplicação.
  - **Vuetify** para os componentes de UI.
  - **Axios** para comunicação com a API.
  
- **Backend**: 
  - **Node.js** com **Express** para criação da API RESTful.

## 🚀 Como Rodar o Projeto

1. **Backend**:
   - Dirija-se até a pasta **backend**
   - Instale as dependências com `npm install`.
   - Rode o comando `npm run database`, para configurar o container Docker e fazer a migração das tabelas. 
   - Configure o banco de dados no arquivo `.env`.
   - Rode o servidor com `npm start`.

2. **Frontend**:
  - Dirija-se até a pasta **frontend**
   - Instale as dependências com `npm install`.
   - Rode o servidor de desenvolvimento com `npm run dev`.

## 🚀 O que Poderia Ser Feito com Mais Tempo

Com mais tempo, várias melhorias e novas funcionalidades poderiam ser implementadas:

- **Autenticação de Usuário**: Implementação de um sistema de login e autenticação, garantindo que apenas usuários autorizados possam realizar operações como adicionar, editar ou remover alunos.
- **Exportação de Dados**: Permitir que os usuários exportem a lista de alunos para formatos como CSV ou PDF para facilitar o compartilhamento e análise de dados.
- **Validação de Dados**: Melhorar a validação de dados no frontend, garantindo que todos os campos obrigatórios sejam preenchidos corretamente antes de permitir o envio do formulário.
- **Relatórios**: Implementação de relatórios detalhados, como número total de alunos cadastrados, gráficos de distribuição por curso, etc.
- **Notificações em Tempo Real**: Implementar um sistema de notificações em tempo real para informar os usuários sobre atualizações ou alterações nos dados dos alunos.
- **Testes Automatizados**: Implementação de testes automatizados (unitários e de integração) para garantir que o sistema funcione corretamente à medida que novas funcionalidades são adicionadas.


## 🌟 Conclusão

Este projeto oferece uma solução eficiente para o gerenciamento de dados de alunos, utilizando as mais modernas ferramentas do ecossistema JavaScript. Com um backend robusto e um frontend interativo, a aplicação pode ser facilmente expandida para suportar novas funcionalidades no futuro. 

É uma excelente base para um sistema de gerenciamento escolar ou qualquer outra aplicação que precise gerenciar dados de usuários de forma simples e intuitiva. 🎓

