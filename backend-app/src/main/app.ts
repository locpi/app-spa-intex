import { SpaInformationEntity, SpaInformationEntityRepository } from './mongo/SpaInformation.entity';
import { SpaInformationsTopic } from './mqtt/SpaInformationsTopic';
import cors from "cors";
import express from "express";
import { Logger } from "~/main/config/Logger";
import { PowerTopic } from "~/main/mqtt/PowerTopic";
import { CommandState } from "~/main/model/CommandState";
import { PowerEntityRepository } from "~/main/mongo/Power.entity";
import { BubbleEntityRepository } from "~/main/mongo/Bubble.entity";
import { HeaterEntityRepository } from "~/main/mongo/Heater.entity";
import { FilterEntityRepository } from "~/main/mongo/Filter.entity";
import { BubbleTopic } from "~/main/mqtt/BubbleTopic";
import { FilterTopic } from "~/main/mqtt/FilterTopic";
import { HeaterTopic } from "~/main/mqtt/HeaterTopic";
import { TemperatureTopic } from "~/main/mqtt/TemperatureTopic";
import { TemperatureEntityRepository } from "~/main/mongo/Temperature.entity";
import { RegisterSession, RegisterSessionEntityRepository } from "~/main/mongo/RegisterSession.entity";
import { LaunchHeaterAutoService } from './services/LaunchHeaterAuto.service';
const port = 3000;
const app = express();
const powerTopic = new PowerTopic();
const bubbleTopic = new BubbleTopic();
const filterTopic = new FilterTopic();
const heaterTopic = new HeaterTopic();
const spaInformationsTopic = new SpaInformationsTopic();
const temperatureTopic = new TemperatureTopic();

const powerRepository = new PowerEntityRepository();
const filterEntityRepository = new FilterEntityRepository();
const heaterEntityRepository = new HeaterEntityRepository();
const bubbleEntityRepository = new BubbleEntityRepository();
const temperatureEntityRepository = new TemperatureEntityRepository();
const registerSessionEntityRepository = new RegisterSessionEntityRepository();
const spaInformationEntityRepository = new SpaInformationEntityRepository();


// BATCH CRON

const launchHeaterAutoService: LaunchHeaterAutoService = new LaunchHeaterAutoService();
launchHeaterAutoService.launchAuto();


// HTTP SERVER CONFIG

app.use(cors({
  origin: "*",
}));
app.use(express.json());

export class Body {
  command: string;
  status: string
}

app.post("/api/v1/command", (req, res) => {
  let body: Body = req.body as Body;
  switch (body.command) {
    case "power":
      powerTopic.changeStateOfSpa(body.status === 'on' ? CommandState.ON : CommandState.OFF);
      break;
    case "bubble":
      bubbleTopic.changeStateOfBubble(body.status === 'on' ? CommandState.ON : CommandState.OFF);
      break;
    case "filter":
      filterTopic.changeStateOfFilter(body.status === 'on' ? CommandState.ON : CommandState.OFF);
      break;
    case "heater":
      heaterTopic.changeStateOfHeater(body.status === 'on' ? CommandState.ON : CommandState.OFF);
      break;
  }
  res.send()
})

app.post("/api/v1/register-session", (req, res) => {
  const obj = req.body;
  registerSessionEntityRepository.save(new RegisterSession(new Date(obj.date), obj.temperature, false));
  res.send()
})

app.get("/api/v1/command/:name", (req, res) => {
  switch (req.params.name) {
    case "power":
      powerRepository.findAllWithParamsSort({}, { date: -1 }).then(data => res.send(data));
      break;
    case "filter":
      filterEntityRepository.findAllWithParamsSort({}, { date: -1 }).then(data => res.send(data));
      break;
    case "heater":
      heaterEntityRepository.findAllWithParamsSort({}, { date: -1 }).then(data => res.send(data));
      break;
    case "bubble":
      bubbleEntityRepository.findAllWithParamsSort({}, { date: -1 }).then(data => res.send(data));
      break;

  }


})

app.get("/api/v1/temperature", (req, res) => {
  var date = new Date();
  date.setDate(date.getDate() - 2);
  temperatureEntityRepository.findAllWithParamsSort({
    date: {
      $gte: date,
      $lt: new Date()
    }
  }, { date: -1 }).then(data => res.send(data))
})

app.get("/api/v1/spa-informations", (req, res) => {
  spaInformationEntityRepository.findFirstWithParamsSort({}, { date: -1 }).then(data => {
    res.send(data)
  })
})

app.get("/api/v1/register-session", (req, res) => {
  registerSessionEntityRepository.findAllWithParamsSort({ finish: false }, { date: -1 }).then(data => {
    res.send(data)
  })
})
app.delete("/api/v1/register-session/:id", (req, res) => {
  registerSessionEntityRepository.deleteById(req.params.id).then(() => {
    res.send()
  })
})
app.listen(port, async () => {
  Logger.info("Demarrage de l'app sur le port", port);
});
