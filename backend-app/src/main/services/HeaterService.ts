import { CommandState } from "../model/CommandState";
import { HeaterEntity, HeaterEntityRepository } from "../mongo/Heater.entity";

export class HeaterService {

    private readonly heaterRepository: HeaterEntityRepository = new HeaterEntityRepository();

    async getStatus(): Promise<HeaterEntity> {
        const heaterP: Promise<HeaterEntity> = this.heaterRepository.findFirstWithParamsSort({}, { date: -1 });
        const heater = await heaterP;
        return heater;
    }

}