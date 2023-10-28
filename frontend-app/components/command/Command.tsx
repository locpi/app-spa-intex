import './Command.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {CommandDescription} from "../../model/CommandDescription";
import {Button, Card, Col, Row} from "react-bootstrap";
import {AiOutlineFire} from "react-icons/ai";

export class Cammnd {
  status: string;

  constructor(status: string) {
    this.status = status;
  }
}

export default function Command({name,label,icon,setPower}) {

  const [command, setCommand] = useState<Cammnd>()


  

  useEffect(() => {
    getData()

  }, [])

function notifyPower(status:string){
  if(setPower){
    if(status==='on'){
      setPower(true);
    }else{
      setPower(false);
    }
  }
}

  function getData() {
    axios.get('/api/v1/command/' + name)
    .then(function (response) {
      const data = response.data[0];
      setCommand(data)
      notifyPower(data.status)
      
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  }

  function update(state:any) {
    axios.post('/api/v1/command',{command:name,status:state})
    .then(function (response) {
      const data = response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  }


  function changeState() {
    if (command!.status === 'on') {
      command!.status = 'off'
    } else {
      command!.status = 'on';
    }
    notifyPower(command!.status)

    const commandUpdate = new Cammnd(command!.status);
    setCommand(command => ({
      ...command,
      ...commandUpdate
    }));
    update(command!.status);
  }

  function getBackgroundColor(): import("csstype").Property.BackgroundColor | undefined {
    switch(command?.status){
      case "on":return "rgb(38, 143, 38)";
      case "standby":return "rgb(191, 146, 33)";
      case "off":return "rgb(124, 129, 124)";

    }
  }

  function active() {
    if (command?.status === 'on') {
      return "icon-active"
    }
    if(command?.status === 'standby'){
      return "icon-standby"
    }
    return "icon-inactive"
  }

  return (command ?
    
  <div onClick={changeState} className={'button-action'}>
    <div  className={'icon '+active()}>{icon}</div>
  </div>
  
 : <></>)}
