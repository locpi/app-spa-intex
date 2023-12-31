import { MongoEntity, MongoRepository } from "~/main/mongo/tools/MongoRepository";
import { CommandState } from "~/main/model/CommandState";
import { v4 as uuidv4 } from 'uuid';

export class FilterEntity extends MongoEntity {

  private readonly date: Date;
  private readonly status: CommandState;


  constructor(date: Date, status: CommandState) {
    super({ id: uuidv4() })
    this.date = date;
    this.status = status;
  }



}

export class FilterEntityRepository extends MongoRepository<FilterEntity> {

  constructor() {
    super("filter-status");
  }
}