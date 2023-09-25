import {Logger} from "~/main/config/Logger";
import {MongoRepository} from "~/main/mongo/tools/MongoRepository";

const {MongoClient} = require('mongodb');

export abstract class MongoConnect {

  protected static readonly Logger = Logger.getLogger(MongoConnect);


  private readonly connectionString = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27018';

  private static client: any;

  protected async getClient(): Promise<any> {
    if (!MongoConnect.client) { // I added this extra check
      MongoConnect.client = await new MongoClient(this.connectionString);
      MongoConnect.Logger.info("init mongo client")
    }
    return MongoConnect.client;
  }
}