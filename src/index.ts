import Router from "./routes";

require('dotenv').config()
import cors = require("cors");
import {Application, Request as RequestType, Response as ResponseType} from "express";
const express = require('express')
import sequelize from './model/db'
import * as models from './model/models'


const PORT = process.env.PORT || 5556;
const app: Application = express();
app.use(cors())
app.use(express.json())
app.use('/api', Router)

app.get('/', (req: RequestType, res: ResponseType) => {
    res.status(200).json({message: 'WORKING!'})
})

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    }
    catch (e) {
        console.log(e)
    }
}

start()


