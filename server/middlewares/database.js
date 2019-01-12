import mongoose from 'mongoose'
import config from '../config';
import fs from 'fs'
import {resolve}  from 'path'
const models = resolve(__dirname, '../database/schema')
fs.readdirSync(models)
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => require(resolve(models , file))
        
    );
export const database = app => {
    mongoose.set('debug',true)
    mongoose.Promise = global.Promise;
    console.log('开始连接mongodb')
    mongoose.connect(config.db)
    mongoose.connection.on('disconnected',() => {
        mongoose.connect(config.db)

    })
    mongoose.connection.on('error' , err => {
        console.err(err)
    })
   mongoose.connection.on('open' , async() => {

        console.log('Connected to mongondb 成功',config.db)

   })
}