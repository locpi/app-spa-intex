import { ObjectId } from "mongodb";
import { Logger } from "~/main/config/Logger";
import { MongoConnect } from "~/main/mongo/tools/MongoConnect";


export class MongoEntity {
  public id: any;

  constructor(id: any) {
    this.id = id;
  }
}

export abstract class MongoRepository<E extends MongoEntity> extends MongoConnect {

  private readonly collection: string;

  public constructor(collection: string) {
    super();
    this.collection = collection;

  }

  public save(elem: E) {
    try {
      super.getClient().then(async (client) => {
        const collection = await client.db().collection(this.collection);

        const object = await collection.findOne({ id: elem.id });
        if (object) {
          Logger.debug("[" + this.collection + "] update object exist with id : " + elem.id);
          const newvalues = {
            $set: elem
          };
          await collection.updateOne({ id: elem.id }, newvalues);
        } else {
          Logger.debug("[" + this.collection + "] add new object with id : " + elem.id);
          await collection.insertOne(elem);
        }
      });
    } catch (e) {
      Logger.error(elem)
    }

  }

  public async findAll(): Promise<E[]> {
    const client = await super.getClient();
    const collection = await client.db().collection(this.collection);
    return await collection.find().toArray();
  }

  public async findAllWithParams(param: any): Promise<E[]> {
    const client = await super.getClient();
    const collection = await client.db().collection(this.collection);
    return await collection.find(param).toArray();
  }

  public async findAllWithParamsSort(param: any, sort: any): Promise<E[]> {
    const client = await super.getClient();
    const collection = await client.db().collection(this.collection);
    return await collection.find(param, { sort: sort }).toArray();
  }

  public async findFirstWithParamsSort(param: any, sort: any): Promise<E> {
    const client = await super.getClient();
    const collection = await client.db().collection(this.collection);
    const promise = await collection.find(param, { sort: sort }).toArray();
    return promise.length > 0 ? promise[0] : null;
  }


  public async findById(elem: any): Promise<E> {
    const client = await super.getClient();
    const collection = await client.db().collection(this.collection);
    return await collection.findOne(elem);
  }

  protected async getCollection() {
    const client = await super.getClient();
    return await client.db().collection(this.collection);
  }

  public async deleteById(id: any): Promise<E> {
    const client = await super.getClient();
    const query = { _id: new ObjectId(id) };
    const collection = await client.db().collection(this.collection);
    return await collection.deleteOne(query);
  }
}
