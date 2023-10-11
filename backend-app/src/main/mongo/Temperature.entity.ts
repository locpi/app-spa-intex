import {MongoEntity, MongoRepository} from "~/main/mongo/tools/MongoRepository";

export class TemperatureEntity implements MongoEntity {

  public  readonly date: Date;
  public  readonly actual: number;
  public readonly expected: number;


  constructor(date: Date, actual: number, expected: number) {
    this.date = date;
    this.actual = actual;
    this.expected = expected;
  }

  _getId(): any {
    return {
      date: this.date
    }
  }

  getOtherField(): any {
    return {
      expected: this.expected,
      actual: this.actual
    }
  }

}

export class TemperatureEntityRepository extends MongoRepository<TemperatureEntity> {

  constructor() {
    super("temperature-history");
  }
}