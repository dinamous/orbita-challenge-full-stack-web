import express from 'express';
import useRoutes from './routes.js';
import User from './models/Student.js';
import config from './config/database.js';
import { Sequelize } from 'sequelize';

const app = express();
app.use(express.json());

const sequelize = new Sequelize(config);

// Inicializar o modelo apenas fora do ambiente de teste
if (process.env.NODE_ENV !== 'test') {
  User.init(sequelize);
  sequelize
    .authenticate()
    .then(() => {
      console.log('Database Connected');
    })
    .catch((err) => {
      console.error(err);
    });
}

app.use('/student', useRoutes);

export default app;
