import { Divider, TimePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import './SelectTimes.css';

export default function SelectTimes() {
  const timeFormat: string = 'HH:mm';
  const [wishedTime, setWishedTime] = useState<Dayjs>(dayjs);

  const onSelectWishedTime = (inputWishedTime: Dayjs) => {
    console.log(`actual: ${wishedTime} <> new: ${inputWishedTime}`);
    setWishedTime(inputWishedTime);
  };

  return (
    <div className='select-times'>
      <div className='actual-time'>
        <h1 className='time-title'>Temps actuel</h1>
        <TimePicker
          value={wishedTime}
          format={timeFormat}
          onChange={onSelectWishedTime}
        />
      </div>
      <Divider />
      <div className='select-wished-time'>
        <h1 className='time-title'>Temps souhaité</h1>
        <TimePicker
          value={wishedTime}
          format={timeFormat}
          onChange={onSelectWishedTime}
        />
      </div>
    </div>
  )
}
