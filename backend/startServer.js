import app from './server.js'; // Importa o app do arquivo server.js

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});