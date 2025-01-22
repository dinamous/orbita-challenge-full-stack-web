export default {
  dialect: 'postgres',
  username: 'postgres',
  password: 'vertrigo',
  host: 'localhost',
  database: 'studentsdb',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true
  }
}