import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import connectDB from './db.js'
import UserRoutes from './routes/UserRoutes.js'


dotenv.config()
const app = express()
connectDB()

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
  credentials: true
}))

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const PORT = process.env.PORT || 3000

app.get('/', async(_req, res)=> {
  try{
    res.status(201).send('Server is Running ✅✅')
  }catch(err){
    res.status(400).send(err.message)
  }
})

app.post('/', async(_req, res)=> {
  try{
    res.status(201).send('Server is Running ✅✅')
  }catch(err){
    res.status(400).send(err.message)
  }
})

app.use('/', UserRoutes)

app.listen(PORT, ()=> {
  console.log(`✅✅ Server running at PORT ${PORT}`)
})
