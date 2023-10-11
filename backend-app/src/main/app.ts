import cors from "cors";
import express from "express";
import {Logger} from "~/main/config/Logger";
import {PowerTopic} from "~/main/mqtt/PowerTopic";
import {CommandState} from "~/main/model/CommandState";
import {PowerEntityRepository} from "~/main/mongo/Power.entity";
import {BubbleEntityRepository} from "~/main/mongo/Bubble.entity";
import {HeaterEntityRepository} from "~/main/mongo/Heater.entity";
import {FilterEntityRepository} from "~/main/mongo/Filter.entity";
import {BubbleTopic} from "~/main/mqtt/BubbleTopic";
import {FilterTopic} from "~/main/mqtt/FilterTopic";
import {HeaterTopic} from "~/main/mqtt/HeaterTopic";
import {TemperatureTopic} from "~/main/mqtt/TemperatureTopic";

const port = 3000;
const app = express();
const powerTopic = new PowerTopic();
const bubbleTopic = new BubbleTopic();
const filterTopic = new FilterTopic();
const heaterTopic = new HeaterTopic();
const temperatureTopic = new TemperatureTopic();

const powerRepository = new PowerEntityRepository();
const filterEntityRepository = new FilterEntityRepository();
const heaterEntityRepository = new HeaterEntityRepository();
const bubbleEntityRepository = new BubbleEntityRepository();


// HTTP SERVER CONFIG

app.use(cors({
  origin: "*",
}));
app.use(express.json());

export class Body {
  command: string;
  status: boolean
}

app.post("/api/v1/command", (req, res) => {
  let body: Body = req.body as Body;

  switch (body.command) {
    case "power" :
      powerTopic.changeStateOfSpa(body.status ? CommandState.ON : CommandState.OFF);
      break;
    case "bubble" :
      bubbleTopic.changeStateOfBubble(body.status ? CommandState.ON : CommandState.OFF);
      break;
    case "filter" :
      filterTopic.changeStateOfFilter(body.status ? CommandState.ON : CommandState.OFF);
      break;
    case "heater" :
      heaterTopic.changeStateOfHeater(body.status ? CommandState.ON : CommandState.OFF);
      break;
  }

  Logger.info(body)


  res.send()
})

app.get("/api/v1/command/:name", (req, res) => {
  switch (req.params.name) {
    case "power" :
      powerRepository.findAllWithParamsSort({}, {date: -1}).then(data => res.send(data));
      break;
    case "filter" :
      filterEntityRepository.findAllWithParamsSort({}, {date: -1}).then(data => res.send(data));
      break;
    case "heater" :
      heaterEntityRepository.findAllWithParamsSort({}, {date: -1}).then(data => res.send(data));
      break;
    case "bubble" :
      bubbleEntityRepository.findAllWithParamsSort({}, {date: -1}).then(data => res.send(data));
      break;

  }


})

app.get("/api/v1/temperature", (req, res) => {

})
app.listen(port, async () => {
  Logger.info("Demarrage de l'app sur le port", port);
  Logger.info("Demarrage de flyway")
});
