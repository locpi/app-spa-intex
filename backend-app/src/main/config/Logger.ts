import {MongoRepository} from "~/main/mongo/tools/MongoRepository";

const pino = require('pino');


export class Logger{
 private static LOG = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
 });

 public static getLogger(MongoRepository: any){
   Logger.LOG.child({ class: MongoRepository })
   return Logger.LOG;
 }
}


