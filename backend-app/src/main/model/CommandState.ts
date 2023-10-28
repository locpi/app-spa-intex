export enum CommandState {
  ON = "on",
  OFF = "off",
  STANDBY="standby"
}

export class EnumHelper{
  public static getCommandStateLibelle(test:CommandState){
    return test;
  }
}