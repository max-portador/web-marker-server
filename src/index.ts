const express = require('express')
require('dotenv').config()
const cors = require("cors");
const fileUpload = require('express-fileupload')
const models = require('./model/models')
import * as path from 'path'

import {Application, Request as RequestType, Response as ResponseType} from "express";
import sequelize from './db'
import Router from "./routes";
import errorHandler from './middleware/ErrorHandlingMiddleWare'


const PORT = process.env.PORT || 5556;
const app: Application = express();
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', Router)
app.use(errorHandler)

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


