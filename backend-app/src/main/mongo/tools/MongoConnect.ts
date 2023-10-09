import {Logger} from "~/main/config/Logger";

const {MongoClient} = require('mongodb');

export abstract class MongoConnect {

  private readonly connectionString = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27018';

  private static client: any;

  protected async getClient(): Promise<any> {
    if (!MongoConnect.client) { // I added this extra check
      MongoConnect.client = await new MongoClient(this.connectionString);
      Logger.info("init mongo client")
    }
    return MongoConnect.client;
  }
}