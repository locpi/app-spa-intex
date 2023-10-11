import React, { useState } from 'react';
import './Temperature.css';
import axios from "axios";

export default function Temperature() {
  const [temperature, setTemperature] = useState<number>(38);

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
    <div className='temperature'>
      {temperature}°C
    </div>
  )
}
