import { useEffect, useState } from 'react';
import Temperature from '../components/Temperature';
import Command from "../components/command/Command";
import {CommandDescription} from "../model/CommandDescription";
import {RiBubbleChartLine} from "react-icons/ri";
import {GiHotSurface, GiVacuumCleaner} from "react-icons/gi";
import {FaPowerOff} from "react-icons/fa";
import '../assets/styles/tile.css';
import './Home.css';
import {Card, Col, Row} from "react-bootstrap";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import axios from 'axios';
import {AiOutlineFire} from "react-icons/ai";
import {IoPowerSharp} from "react-icons/io5"
import {GiWaterRecycling} from "react-icons/gi"
export default function Home() {
  const [power,setPower] = useState(false);

  return (
      <div className={'home'}>
        <Row className='header'>
        <Col>
        <h1 className={"title"}>INTEX</h1>
       
        </Col>
      </Row>
      <Row className='justify-content-sm-center'>
        <Col sm={6}>
        <Temperature/>
        </Col>
      </Row>
      <Row className='justify-content-center'>
      <Col sm={4}>
              <Command  name={'power'} label={'Allumer'} icon={<IoPowerSharp/>} setPower={setPower}/>
            </Col>
      </Row>
      
            {power?
            <Row  className='justify-content-center'>
            <Col sm={4} >
              <Command name={"filter"} label={'Filtration'} icon={<GiWaterRecycling/>} setPower={null}/>
            </Col>
            <Col sm={4} >
              <Command  name={'heater'} label={'Chauffe'} icon={<AiOutlineFire/>} setPower={null}/>
            </Col>
            <Col sm={4} >
              <Command  name={'bubble'} label={'Bulles'} icon={<RiBubbleChartLine/>} setPower={null}/>
            </Col>
            </Row>:<></>}
      
 
        

      </div>

  )
}
