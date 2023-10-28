import {connect} from "mqtt";
import {Logger} from "~/main/config/Logger";
import {CommandState} from "~/main/model/CommandState"; // import connect from mqtt
import { PowerCommandException } from "../model/PowerState";


export abstract class AbstractMqttService {

  protected static readonly client = connect(process.env.MQTT_URL|| 'mqtt://localhost', {
    auth: "spa:spa",
    port: 1883
  });

  protected constructor() {
    AbstractMqttService.client.on("connect", (err) => {
      Logger.info("MQTT client connected")

    });
  }

  protected subscribeTo(topic: string, callback: any) {
    AbstractMqttService.client.subscribe(topic, {qos: 1}, (err) => {
    });
    AbstractMqttService.client.on("message", (topicA, message, packet) => {
      if (topic === topicA) {
        Logger.trace("new message incoming from " + topic + " --> " + message)
        callback(message.toString())
      }
    })
  }

  protected sendMessage(topic: string, message: any) {
    const messageBody = message.toString().toLowerCase();
    Logger.debug("Publish new message incoming to " + topic + " --> " + messageBody)
    AbstractMqttService.client.publish(topic, messageBody);
  }

  protected mapToCommandState(message:string):CommandState{
   if(message==='on'){
    return CommandState.ON;
   }
   if(message==='off'){
    return CommandState.OFF;
   }
   if(message==='standby'){
    return CommandState.STANDBY;
   }
   throw new PowerCommandException("Unexpected command found "+message);
  }
}