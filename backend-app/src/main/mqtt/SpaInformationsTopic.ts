import { SpaInformationEntity, SpaInformationEntityRepository } from './../mongo/SpaInformation.entity';
import { AbstractMqttService } from "./AbstractMqttService";

export class SpaInformationsTopic extends AbstractMqttService{
    private readonly spaInformationEntityRepository: SpaInformationEntityRepository = new SpaInformationEntityRepository();

    constructor() {
      super();
  
      super.subscribeTo("wifi/state", ((message: string) => {
        const newLine = new SpaInformationEntity();
        newLine.spaStatus = message;
        this.saveNewLineOfInformations(newLine);
      }))
      super.subscribeTo("wifi/ip", ((message: string) => {
        const newLine = new SpaInformationEntity();
        newLine.ip = message;
        this.saveNewLineOfInformations(newLine);
      }))
      super.subscribeTo("wifi/rssi", ((message: string) => {
        const newLine = new SpaInformationEntity();
        newLine.rssi = message;
        this.saveNewLineOfInformations(newLine);
      }))
      super.subscribeTo("wifi/version", ((message: string) => {
        const newLine = new SpaInformationEntity();
        newLine.version = message;
        this.saveNewLineOfInformations(newLine);
      }))
      super.subscribeTo("pool/model", ((message: string) => {
        const newLine = new SpaInformationEntity();
        newLine.model = message;
        this.saveNewLineOfInformations(newLine);
      }))
    }

  
    public getLastLineOfInformations():Promise<SpaInformationEntity>{
      return this.spaInformationEntityRepository.findFirstWithParamsSort({}, {date: -1});
    }

    public saveNewLineOfInformations(newest:SpaInformationEntity):void{
      this.getLastLineOfInformations().then(old=>{
        const merged = Object.assign(new SpaInformationEntity(), old, newest) as  SpaInformationEntity ;
        this.spaInformationEntityRepository.save(merged);
      })
    }

}