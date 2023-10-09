import {AbstractMqttService} from "~/main/mqtt/AbstractMqttService";

import {Logger} from "~/main/config/Logger";
import {CommandState, EnumHelper} from "~/main/model/CommandState";
import {BubbleEntity, BubbleEntityRepository} from "~/main/mongo/Bubble.entity";
import {FilterEntity, FilterEntityRepository} from "~/main/mongo/Filter.entity";

export class FilterTopic extends AbstractMqttService {
  private readonly filterEntityRepository: FilterEntityRepository = new FilterEntityRepository();

  constructor() {
    super();

    super.subscribeTo("pool/filter", ((message: string) => {
      this.actualBubbleStatusMessage(this.mapToCommandState(message))
    }))
  }

  private actualBubbleStatusMessage(status: CommandState) {
    Logger.debug("Receive actual spa status", EnumHelper.getCommandStateLibelle(status))
    this.filterEntityRepository.save(new FilterEntity(new Date(), status))
  }

  public changeStateOfFilter(state: CommandState) {
    this.sendMessage("pool/command/filter", state);
    if(!process.env.PRODUCTION){
      this.sendMessage("pool/filter", state);
    }
  }
}