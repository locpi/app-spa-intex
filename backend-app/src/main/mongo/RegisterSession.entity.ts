import { MongoEntity, MongoRepository } from "~/main/mongo/tools/MongoRepository";
import { v4 as uuidv4 } from 'uuid';

export class RegisterSession extends MongoEntity {

  public readonly date: Date;
  public readonly temperature: number;
  public finish: boolean;


  constructor(date: Date, temperature: number, finish: boolean) {
    super({ id: uuidv4() })
    this.date = date;
    this.temperature = temperature;
    this.finish = finish;
  }


}

export class RegisterSessionEntityRepository extends MongoRepository<RegisterSession> {

  constructor() {
    super("register-session");
  }
}