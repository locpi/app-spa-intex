import React, { useState } from 'react';
import './Temperature.css';

export default function Temperature() {
  const [temperature, setTemperature] = useState<number>(38);

  return (
    <div className='temperature'>
      {temperature}°C
    </div>
  )
}
