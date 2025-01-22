import express from 'express'
import useRoutes from './routes.js'
import User from './models/Student.js'
import config from './config/database.js'
import { Sequelize } from 'sequelize'

const app = express()
app.use(express.json())

const sequelize = new Sequelize(config)
User.init(sequelize)

app.use('/student', useRoutes)

sequelize.authenticate().then(() => {
  console.log("Database Connected")
  app.listen(3000, (err, res) => {
    console.log("Server on")
  })
}).catch((err) => {
  console.error(err)
})

