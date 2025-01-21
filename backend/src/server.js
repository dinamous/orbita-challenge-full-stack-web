import express from 'express'
import useRoutes from './routes.js'

const app = express()
app.use(express.json())

app.use('/students', useRoutes)
app.listen(3000, (err, res) => {
  console.log("Server on")
})