import express from 'express';
import useRoutes from './routes.js';
import User from './models/Student.js';
import config from './config/database.js';
import { Sequelize } from 'sequelize';
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors());

const sequelize = new Sequelize(config);

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
