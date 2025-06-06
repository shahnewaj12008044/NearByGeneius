/* eslint-disable no-console */
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import { Server } from 'http';

let server  : Server;

async function main() {
    try{
        await mongoose.connect(config.db_url as string);
        server = app.listen(config.port, () => {
            console.log(`Example app listening on port ${config.port}`)
          })
    }catch(err){
        console.log(err)
    }
  }
  main()
  process.on('unhandledRejection',()=>{
    console.log(` unhandled rejection is detected! shutting down...`)
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
  })

  process.on('uncaughtException',()=>{
    console.log(`uncaught exception detected. server is shutting down....`)
    process.exit(1)
  })