import 'dotenv/config';

export default {
  dialect: 'postgres',
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'vertrigo',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'studentsdb',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
