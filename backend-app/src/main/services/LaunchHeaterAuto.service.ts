import { RegisterSessionEntityRepository } from "../mongo/RegisterSession.entity";
import { TemperatureEntityRepository } from "../mongo/Temperature.entity";
import { Job, scheduleJob } from "node-schedule"
import { HeaterTopic } from "../mqtt/HeaterTopic";
import { CommandState } from "../model/CommandState";
import { Logger } from "../config/Logger";
export class LaunchHeaterAutoService {

    private temperatureEntityRepository = new TemperatureEntityRepository();
    private registerSessionEntityRepository = new RegisterSessionEntityRepository();
    private heaterTopic = new HeaterTopic();

    private jobAuto: Job;

    public launch(): void {

        const degrePerHour = 2;
        var date = new Date();
        date.setDate(date.getDate() - 2);

        this.temperatureEntityRepository.findAllWithParamsSort({
            date: {
                $gte: date,
                $lt: new Date()
            }
        }, { date: -1 }).then(temps => {
            const actualTemp = temps[0].actual;
            const now = new Date();
            this.registerSessionEntityRepository.findAll().then(sessions => {
                sessions.forEach(session => {
                    if (session.date < new Date()) {
                        session.finish = true;
                        this.registerSessionEntityRepository.save(session);
                    }
                    var hours = Math.abs(session.date.getTime() - now.getTime()) / 36e5;
                    const deltaTemp = Math.trunc(Math.abs(session.temperature - actualTemp));
                    const degreWinIfStartNow = Math.trunc(degrePerHour * hours);
                    if (deltaTemp == degreWinIfStartNow) {
                        console.log('demarrage de la chauffe')
                        this.heaterTopic.changeStateOfHeater(CommandState.ON);
                    }
                })
            })
        })
    }

    public launchAuto(): void {
        const cron = "* * * * *";
        Logger.info("Init du cron LaunchHeaterAutoService avec en valeur : " + cron);

        this.jobAuto = scheduleJob(cron, function () {
            new LaunchHeaterAutoService().launch();
        })
    }

}