import './Command.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {CommandDescription} from "../../model/CommandDescription";
import {Button} from "react-bootstrap";

export class Cammnd {
  status: string;

  constructor(status: string) {
    this.status = status;
  }
}

export default function Command({name,icon}:CommandDescription) {


  const [command, setCommand] = useState<Cammnd>()


  function getClassState() {
    if (command?.status === 'on') {
      return "success"
    }
    return "secondary"

  }


  const getIcon = () => {
    return icon;
  };

  useEffect(() => {
    getData()

  }, [])


  function getData() {
    axios.get('/api/v1/command/' + name)
    .then(function (response) {
      const data = response.data[0];
      setCommand(data)
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
    const commandUpdate = new Cammnd(command!.status);
    setCommand(command => ({
      ...command,
      ...commandUpdate
    }));
    update(command!.status);
  }

  return (command ? <Button variant={getClassState()}  onClick={() => changeState()}>
      {getIcon()}
    </Button> : <></>)

}
