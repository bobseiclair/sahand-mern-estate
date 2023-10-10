import express from 'express'
import userRouter from './routes/user.route.js'

import dotenv from 'dotenv'
dotenv.config()

import connectDB from './config/db.js'

const port =  3000 || process.env.PORT 

connectDB()

const app = express()

app.listen(port, () => console.log(`Server en marche sur le port ${port}`))

app.use('/api/user', userRouter)
