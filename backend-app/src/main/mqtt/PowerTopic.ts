import {AbstractMqttService} from "~/main/mqtt/AbstractMqttService";
import {Logger} from "~/main/config/Logger";
import {CommandState, EnumHelper} from "~/main/model/CommandState";
import {PowerEntity, PowerEntityRepository} from "~/main/mongo/Power.entity";

export class PowerTopic extends AbstractMqttService {

  private readonly powerEntityRepository: PowerEntityRepository = new PowerEntityRepository();

  constructor() {
    super();

    super.subscribeTo("pool/power", ((message: string) => {
      this.actualSpaStatusMessage(this.mapToCommandState(message))
    }))
  }

  private actualSpaStatusMessage(status: CommandState) {
    Logger.debug("Receive actual spa status", EnumHelper.getCommandStateLibelle(status))
    this.powerEntityRepository.save(new PowerEntity(new Date(), status))
  }

  public changeStateOfSpa(state: CommandState) {
    this.sendMessage("pool/command/power", state);
    if(!process.env.PRODUCTION){
      this.sendMessage("pool/power", state);
    }
  }
}