export enum CommandState {
  ON = 1,
  OFF = 0
}

export class EnumHelper{
  public static getCommandStateLibelle(test:any){
    return CommandState[test];
  }
}