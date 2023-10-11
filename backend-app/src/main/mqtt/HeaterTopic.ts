import {AbstractMqttService} from "~/main/mqtt/AbstractMqttService";

import {Logger} from "~/main/config/Logger";
import {CommandState, EnumHelper} from "~/main/model/CommandState";
import {HeaterEntity, HeaterEntityRepository} from "~/main/mongo/Heater.entity";

export class HeaterTopic extends AbstractMqttService {
  private readonly heaterEntityRepository: HeaterEntityRepository = new HeaterEntityRepository();

  constructor() {
    super();

    super.subscribeTo("pool/heater", ((message: string) => {
      this.actualBubbleStatusMessage(this.mapToCommandState(message))
    }))
  }

  private actualBubbleStatusMessage(status: CommandState) {
    Logger.debug("Receive actual spa status", status)
    this.heaterEntityRepository.save(new HeaterEntity(new Date(), status))
  }

  public changeStateOfHeater(state: CommandState) {
    this.sendMessage("pool/command/heater",state);
    if (!process.env.PRODUCTION) {
      this.sendMessage("pool/heater",state);
    }
  }
}