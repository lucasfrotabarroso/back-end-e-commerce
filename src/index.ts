import { Request, Response } from "express"
import { router } from "./routes"

const express = require('express')

export const app = express()

app.use(express.json())
app.use(router)

app.get('/',(res:Response) => {
    res.send('home')
})





app.listen(5007,()=>{
    console.log('rodando na porta 5007')
})