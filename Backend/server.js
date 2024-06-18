import express from 'express'
import userRouter from './routers/users.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.NODE_PORT
const app = express()

app.use('/api/users',userRouter)
app.get('/',(req,res)=>res.send("seeecct"))

app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})