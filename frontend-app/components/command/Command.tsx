import './Command.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {CommandDescription} from "../../model/CommandDescription";

export class Cammnd {
  status: boolean;

  constructor(status: boolean) {
    this.status = status;
  }
}

export default function Command({name,icon}:CommandDescription) {


  const [command, setCommand] = useState<Cammnd>()


  function getClassState() {
    if (command?.status) {
      return "command-state-active"
    }
    return "command-state-disabled"

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
    const commandUpdate = new Cammnd(!command!.status);
    setCommand(command => ({
      ...command,
      ...commandUpdate
    }));
    update(!command!.status);
  }

  return command ? <div className={'command ' + getClassState()} onClick={() => changeState()}>
      {getIcon()}
    </div> : <></>

}
