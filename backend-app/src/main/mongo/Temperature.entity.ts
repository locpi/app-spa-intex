import { MongoEntity, MongoRepository } from "~/main/mongo/tools/MongoRepository";
import { v4 as uuidv4 } from 'uuid';

export class TemperatureEntity extends MongoEntity {

  public readonly date: Date;
  public readonly actual: number;
  public readonly expected: number;


  constructor(date: Date, actual: number, expected: number) {
    super({ id: uuidv4() })

    this.date = date;
    this.actual = actual;
    this.expected = expected;
  }


}

export class TemperatureEntityRepository extends MongoRepository<TemperatureEntity> {

  constructor() {
    super("temperature-history");
  }
}