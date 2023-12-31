import { useEffect, useState } from 'react';
import Temperature from '../../components/Temperature';
import Command from "../../components/Command";
import { CommandDescription } from "../../model/CommandDescription";
import { RiBubbleChartLine } from "react-icons/ri";
import { GiHotSurface, GiVacuumCleaner } from "react-icons/gi";
import { FaPowerOff } from "react-icons/fa";
import './Home.css';
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import axios from 'axios';
import { AiOutlineFire } from "react-icons/ai";
import { IoPowerSharp } from "react-icons/io5"
import { GiWaterRecycling } from "react-icons/gi"
import SpaProgrammerModal from '../../components/modal/SpaProgrammer.modal';
import HeaterProgrammation from '../../components/HeaterProgrammation';
import NavBar from '../../components/NavBar';


export default function Home() {
  const [power, setPower] = useState(false);


  return (
    <div className={'home'}>


      <Row >
        <Col sm={6} className='justify-content-sm-center'>
          <Temperature />
        </Col>
      </Row>
      <Row >
        <Col >
          <Command name={'power'} label={'Allumer'} icon={<IoPowerSharp />} setPower={setPower} />
        </Col>
        {power ?
          <Col >
            <Command name={"filter"} label={'Filtration'} icon={<GiWaterRecycling />} setPower={null} />
          </Col> : <></>}
      </Row>

      {power ?
        <Row>
          <Col  >
            <Command name={'heater'} label={'Chauffe'} icon={<AiOutlineFire />} setPower={null} />
          </Col>
          <Col  >
            <Command name={'bubble'} label={'Bulles'} icon={<RiBubbleChartLine />} setPower={null} />
          </Col>
        </Row> : <></>}



      <NavBar />

    </div>

  )
}
