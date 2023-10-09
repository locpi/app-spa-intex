import {AbstractMqttService} from "~/main/mqtt/AbstractMqttService";

import {Logger} from "~/main/config/Logger";
import {CommandState, EnumHelper} from "~/main/model/CommandState";
import {BubbleEntity, BubbleEntityRepository} from "~/main/mongo/Bubble.entity";

export class BubbleTopic extends AbstractMqttService {
  private readonly bubbleEntityRepository: BubbleEntityRepository = new BubbleEntityRepository();

  constructor() {
    super();

    super.subscribeTo("pool/bubble", ((message: string) => {
      this.actualBubbleStatusMessage(this.mapToCommandState(message))
    }))
  }

  private actualBubbleStatusMessage(status: CommandState) {
    Logger.debug("Receive actual spa status", EnumHelper.getCommandStateLibelle(status))
    this.bubbleEntityRepository.save(new BubbleEntity(new Date(), status))
  }

  public changeStateOfBubble(state: CommandState) {
    this.sendMessage("pool/command/bubble", state);
    if(!process.env.PRODUCTION){
      this.sendMessage("pool/bubble", state);
    }
  }
}