import React from 'react';
import Temperature from '../components/Temperature';

import '../assets/styles/tile.css';
import './Home.css';
import Command from "../components/command/Command";
import {CommandDescription} from "../model/CommandDescription";
import {FaPowerOff} from "react-icons/fa";
import {RiBubbleChartLine} from "react-icons/ri";
import {GiHotSurface} from "react-icons/gi";
import {TbVacuumCleaner} from "react-icons/tb";

export default function Home() {
  return (
      <div className='home'>
        <div className='tile'>
          <div className='left'>
            <Temperature/>
            {/* <MoreInfos /> */}
          </div>
          <div className='right'>
            <Command {...new CommandDescription('power', <FaPowerOff/>)}/>
            <Command {...new CommandDescription('filter', <TbVacuumCleaner/>)}/>
            <Command {...new CommandDescription('heater', <GiHotSurface/>)}/>
            <Command {...new CommandDescription('bubble', <RiBubbleChartLine/>)}/>
          </div>
      </div>
    </div>
  )
}
