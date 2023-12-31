import { MongoEntity, MongoRepository } from "~/main/mongo/tools/MongoRepository";
import { CommandState } from "~/main/model/CommandState";
import { v4 as uuidv4 } from 'uuid';

export class HeaterEntity extends MongoEntity {

  public readonly date: Date;
  public readonly status: CommandState;


  constructor(date: Date, status: CommandState) {
    super({ id: uuidv4() })
    this.date = date;
    this.status = status;
  }



}

export class HeaterEntityRepository extends MongoRepository<HeaterEntity> {

  constructor() {
    super("heater-status");
  }
}