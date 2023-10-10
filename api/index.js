import express from 'express'

import dotenv from 'dotenv'
dotenv.config()

import connectDB from './config/db.js'

const port =  3000 || process.env.PORT 

connectDB()

const app = express()

app.listen(port, () => console.log(`Server en marche sur le port ${port}`))

