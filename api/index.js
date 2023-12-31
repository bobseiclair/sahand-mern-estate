import express from 'express'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'

import dotenv from 'dotenv'
dotenv.config()

import connectDB from './config/db.js'

const port =  3000 || process.env.PORT 

connectDB()

const app = express()
app.use(express.json())

app.listen(port, () => console.log(`Server en marche sur le port ${port}`))

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})
