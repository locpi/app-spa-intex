import './Command.css';
import {useEffect, useState} from "react";
import axios from "axios";

export class Cammnd {
  status: boolean;
}

export default function Command({desc}) {


  const [command, setCommand] = useState<Cammnd>()


  function getClassState() {
    if (command?.status) {
      return "command-state-active"
    }
    return "command-state-disabled"

  }


  const getIcon = () => {
    return desc.icon
  };

  useEffect(() => {
    getData()

  }, [])


  function getData() {
    axios.get('/api/v1/command/' + desc.name)
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

  function update(state) {
    axios.post('/api/v1/command',{command:desc.name,status:state})
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
    const commandUpdate = new Cammnd();
    commandUpdate.status = !command!.status;
    setCommand(command => ({
      ...command,
      ...commandUpdate
    }));
    update(!command!.status);
  }

  return (<div>
    {command ? <div className={'command ' + getClassState()} onClick={() => changeState()}>
      {getIcon()}
    </div> : <></>}
  </div>)
}
