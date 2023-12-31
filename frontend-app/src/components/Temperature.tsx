import React, { useEffect, useState } from 'react';
import './css/Temperature.css';
import axios from "axios";
import GaugeComponent from 'react-gauge-component';
import { Row } from 'react-bootstrap';
import moment from 'moment';
import ChangeTemperatureSetModal from './modal/ChangeTemperatureSet.modal';


export class TemperatureItem {
  date: Date | undefined;
  actual: number | undefined;

}

export default function Temperature() {
  const [temperature, setTemperature] = useState<TemperatureItem>();
  const [show, setShow] = useState(false);


  useEffect(() => {
    axios.get('/api/v1/temperature')
      .then(function (response) {
        const data = response.data[0];
        setTemperature(data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, [])







  return (

    <div className='justify-content-sm-center'>
      <ChangeTemperatureSetModal show={show} setShow={setShow} />

      <Row onClick={() => setShow(!show)}>
        <GaugeComponent
          type="semicircle"
          arc={{
            width: 0.2,
            padding: 0.005,
            cornerRadius: 1,
            // gradient: true,
            subArcs: [
              {
                limit: 15,
                color: 'rgb(85,175,232)',
                showTick: true
              },
              {
                limit: 25,
                color: 'rgb(79,200,37)',
                showTick: true,
              },
              {
                limit: 35,
                color: 'rgb(229,235,7)',
                showTick: true
              },
              {
                color: 'rgb(221,26,11)'
              }
            ]
          }}
          pointer={{
            color: '#345243',
            length: 0.80,
            width: 10,
          }}
          labels={{
            valueLabel: { matchColorWithArc: true, formatTextValue: value => value + 'ºC' },
            tickLabels: {
              type: 'inner',
              defaultTickValueConfig: { formatTextValue: (value: string) => value + 'ºC' }
            }
          }}
          value={temperature?.actual}
          minValue={0}
          maxValue={40} />
        <span className='last-refresh'>Derniere actualisation : {
          moment(temperature?.date).format('DD/MM/YYYY HH:mm') // December 28th 2023, 4:14:23 pm
        }</span>
      </Row>

    </div>

  )
}
