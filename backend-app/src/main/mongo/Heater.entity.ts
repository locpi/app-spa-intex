import { MongoEntity, MongoRepository } from "~/main/mongo/tools/MongoRepository";
import { CommandState } from "~/main/model/CommandState";

export class HeaterEntity implements MongoEntity {

  private readonly date: Date;
  private readonly status: CommandState;


  constructor(date: Date, status: CommandState) {
    this.date = date;
    this.status = status;
  }

  _getId(): any {
    return {
      date: this.date,
      status: this.status
    }
  }

  getOtherField(): any {

  }

}

export class HeaterEntityRepository extends MongoRepository<HeaterEntity> {

  constructor() {
    super("heater-status");
  }
}