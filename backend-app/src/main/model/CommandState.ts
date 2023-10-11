export enum CommandState {
  ON = "on",
  OFF = "off"
}

export class EnumHelper{
  public static getCommandStateLibelle(test:CommandState){
    return test;
  }
}