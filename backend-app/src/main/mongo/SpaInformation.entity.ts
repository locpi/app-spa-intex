import {MongoEntity, MongoRepository} from "~/main/mongo/tools/MongoRepository";
import { v4 as uuidv4 } from 'uuid';

export class SpaInformationEntity implements MongoEntity {
  public  readonly id: string;
  public  readonly date: Date;

  public  spaStatus: string;
  public  ip: string;
  public  model: string;
  public  rssi: string;
  public  version: string;


  constructor() {
    this.id=uuidv4();
    this.date = new Date();
  }

  _getId(): any {
    return {
      id: this.id,
      date: this.date
    }
  }

  getOtherField(): any {
    return {
      spaStatus: this.spaStatus,
      ip: this.ip,
      model:this.model,
      rssi:this.rssi,
      version: this.version
    }
  }

}

export class SpaInformationEntityRepository extends MongoRepository<SpaInformationEntity> {

  constructor() {
    super("spa-informations");
  }
}