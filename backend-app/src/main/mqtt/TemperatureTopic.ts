import {AbstractMqttService} from "~/main/mqtt/AbstractMqttService";
import {Logger} from "~/main/config/Logger";
import {TemperatureEntity, TemperatureEntityRepository} from "~/main/mongo/Temperature.entity";

export class TemperatureTopic extends AbstractMqttService {

  private readonly temperatureEntityRepository: TemperatureEntityRepository = new TemperatureEntityRepository();

  constructor() {
    super();

    super.subscribeTo("pool/water/tempAct", ((message: string) => {
      this.saveHisotryOfTemperatureActChange(Number(message))
    }))
    super.subscribeTo("pool/water/tempSet", ((message: string) => {
      this.saveHisotryOfTemperatureSetChange(Number(message))
    }))
  }

  private saveHisotryOfTemperatureSetChange(temp: number) {
    Logger.debug("Receive change temp set " + temp + " degre")
    this.getLastRecord().then(data => {
      if (data.length ==0) {
        this.temperatureEntityRepository.save(new TemperatureEntity(new Date(), -1, temp))
      } else {
        this.temperatureEntityRepository.save(new TemperatureEntity(new Date(), data[0].actual, temp))
      }
    })
  }

  private saveHisotryOfTemperatureActChange(temp: number) {
    Logger.debug("Receive change temp act " + temp + " degre")
    this.getLastRecord().then(data => {
      if (data.length ==0) {
        this.temperatureEntityRepository.save(new TemperatureEntity(new Date(), temp, -1))
      } else {
        this.temperatureEntityRepository.save(new TemperatureEntity(new Date(), temp, data[0].expected))
      }
    })
  }

  private getLastRecord() {
    return this.temperatureEntityRepository.findAllWithParamsSort({}, {date: -1})
  }

  public changeTempSet(temp: number) {
    this.sendMessage("pool/command/water/tempSet", temp);
    if (!process.env.PRODUCTION) {
      this.sendMessage("pool/water/tempSet", temp);
    }
  }
}