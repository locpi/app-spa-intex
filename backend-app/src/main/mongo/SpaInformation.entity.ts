import { MongoEntity, MongoRepository } from "~/main/mongo/tools/MongoRepository";
import { v4 as uuidv4 } from 'uuid';

export class SpaInformationEntity extends MongoEntity {
  public readonly date: Date;

  public spaStatus: string;
  public ip: string;
  public model: string;
  public rssi: string;
  public version: string;


  constructor() {
    super({ id: uuidv4() })
    this.date = new Date();
  }



}

export class SpaInformationEntityRepository extends MongoRepository<SpaInformationEntity> {

  constructor() {
    super("spa-informations");
  }
}