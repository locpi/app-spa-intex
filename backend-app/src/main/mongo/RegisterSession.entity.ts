import {MongoEntity, MongoRepository} from "~/main/mongo/tools/MongoRepository";
import { v4 as uuidv4 } from 'uuid';

export class RegisterSession implements MongoEntity {
  public  readonly id: string;

  public  readonly date: Date;
  public  readonly temperature: number;
  public finish: boolean;


  constructor(date: Date, temperature: number, finish: boolean) {
    this.id=uuidv4();
    this.date = date;
    this.temperature = temperature;
    this.finish = finish;
  }

  _getId(): any {
    return {
      date: this.id
    }
  }

  getOtherField(): any {
    return {
      temperature: this.temperature,
      finish: this.finish,
      date: this.date

    }
  }

}

export class RegisterSessionEntityRepository extends MongoRepository<RegisterSession> {

  constructor() {
    super("register-session");
  }
}