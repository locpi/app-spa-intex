import React, { useState } from 'react';
import './Temperature.css';
import axios from "axios";
import GaugeComponent from 'react-gauge-component';

export default function Temperature() {
  const [temperature, setTemperature] = useState<number>(-1);

    axios.get('/api/v1/temperature')
    .then(function (response) {
      const data = response.data[0];
      setTemperature(data.actual)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });






  return (
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
 width: 15,
}}
labels={{
 valueLabel: { matchColorWithArc:true,formatTextValue: value => value + 'ºC' },
 tickLabels: {
   type: 'inner',
   valueConfig: { formatTextValue: value => value + 'ºC', fontSize: 10 }
 }
}}
value={22.5}
minValue={0}
maxValue={40}/>
  )
}
