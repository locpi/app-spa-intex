import React from 'react';
import MoreInfos from '../components/MoreInfos';
import SelectTimes from '../components/SelectTimes';
import Temperature from '../components/Temperature';

import '../assets/styles/tile.css';
import './Home.css';

export default function Home() {
  return (
    <div className='home'>
      <div className='tile'>
        <div className='left'>
          <Temperature />
          {/* <MoreInfos /> */}
        </div>
        <div className='right'>
          <SelectTimes />
        </div>
      </div>
    </div>
  )
}
