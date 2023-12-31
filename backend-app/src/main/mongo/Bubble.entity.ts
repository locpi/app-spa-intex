import { MongoEntity, MongoRepository } from "~/main/mongo/tools/MongoRepository";
import { CommandState } from "~/main/model/CommandState";
import { v4 as uuidv4 } from 'uuid';

export class BubbleEntity implements MongoEntity {

  private readonly id: string;
  private readonly date: Date;
  private readonly status: CommandState;


  constructor(date: Date, status: CommandState) {
    this.id = uuidv4();
    this.date = date;
    this.status = status;
  }

  _getId(): any {
    return {
      id: this.id
    }
  }

  getOtherField(): any {
    return {
      date: this.date,
      status: this.status
    }
  }

}

export class BubbleEntityRepository extends MongoRepository<BubbleEntity> {

  constructor() {
    super("bubble-status");
  }
}