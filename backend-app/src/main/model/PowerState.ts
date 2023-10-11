import {Logger} from "~/main/config/Logger";
import {CommandState, EnumHelper} from "~/main/model/CommandState";



export class PowerCommand {
  private actualState: CommandState;

  constructor(state: CommandState) {
    this.actualState = state;
    Logger.debug("Actual state is", this.actualState)
  }

  public changeState(newState: CommandState) {
    if (this.isOn() && newState == CommandState.OFF) {
      this.actualState = newState;
      Logger.debug("Switch to OFF")
    } else if (!this.isOn() && newState == CommandState.ON) {
      this.actualState = newState;
      Logger.debug("Switch to ON")
    } else {
      throw new PowerCommandException("You cannot switch to " + newState + " when actual state is " + this.actualState);
    }
  }

  public isOn(): boolean {
    return this.actualState == CommandState.ON;
  }

}

export class PowerCommandException extends Error {

}