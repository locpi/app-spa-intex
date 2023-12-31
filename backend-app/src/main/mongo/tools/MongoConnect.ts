import {Logger} from "~/main/config/Logger";

const {MongoClient} = require('mongodb');

export abstract class MongoConnect {

  private readonly connectionString = process.env.MONGO_URL || 'mongodb://localhost:27017';

  private static client: any;

  protected async getClient(): Promise<any> {
    if (!MongoConnect.client) { // I added this extra check
      MongoConnect.client = await new MongoClient(this.connectionString);
      Logger.info("init mongo client")
    }
    return MongoConnect.client;
  }
}