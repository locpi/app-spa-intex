import {Logger} from "~/main/config/Logger";
import {MongoConnect} from "~/main/mongo/tools/MongoConnect";


export interface MongoEntity {
  _getId(): any;

  getOtherField(): any;
}

export abstract class MongoRepository<E extends MongoEntity> extends MongoConnect {

  protected static Logger = Logger.getLogger(MongoRepository);

  private readonly collection: string;

  protected constructor(collection: string) {
    super();
    this.collection = collection;

  }

  public save(elem: E) {
    super.getClient().then(async (client) => {
      const collection = await client.db().collection(this.collection);
      const object = await collection.findOne(elem._getId());
      if (object) {
        MongoRepository.Logger.debug("[" + this.collection + "] update object exist with id : " + elem._getId());
        const newvalues = {
          $set: elem.getOtherField()
        };
        await collection.updateOne(elem._getId(), newvalues);
      } else {
        MongoRepository.Logger.debug("[" + this.collection + "] add new object with id : " + elem._getId());
        await collection.insertOne(this.getEntity(elem));
      }
    });
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
    return await collection.find(param, {sort: sort}).toArray();
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

  private getEntity(elem: E): any {
    return {
      ...elem._getId(),
      ...elem.getOtherField(),
    };
  }
}
