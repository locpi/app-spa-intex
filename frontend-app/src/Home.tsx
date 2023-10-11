import React from 'react';
import Temperature from '../components/Temperature';

import '../assets/styles/tile.css';
import './Home.css';
import Command from "../components/command/Command";
import {CommandDescription} from "../model/CommandDescription";
import {FaPowerOff} from "react-icons/fa";
import {RiBubbleChartLine} from "react-icons/ri";
import {GiHotSurface, GiVacuumCleaner} from "react-icons/gi";
import {TbVacuumCleaner} from "react-icons/tb";
import {Col, Container, Row} from "react-bootstrap";
import {Button} from "react-bootstrap";

export default function Home() {
  return (
      <div className={'home'}>
        <Container>
          <Row>
            <Col>  <Temperature/></Col>
          </Row>
          <Row>
            <Col sm={12} md={3}>
              <Command {...new CommandDescription('power', <FaPowerOff/>)}/>
            </Col>
            <Col sm={12} md={3}>
              <Command {...new CommandDescription('filter', <GiVacuumCleaner/>)}/>
            </Col>
            <Col sm={12} md={3}>
              <Command {...new CommandDescription('heater', <GiHotSurface/>)}/>
            </Col>
            <Col sm={12} md={3}>
              <Command {...new CommandDescription('bubble', <RiBubbleChartLine/>)}/>
            </Col>
          </Row>
        </Container>
      </div>

  )
}
