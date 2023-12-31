import { Row, Col, Button, Card, Form, InputGroup } from "react-bootstrap";
import HeaterProgrammation from "../../components/HeaterProgrammation";
import { useState, useEffect } from "react";
import { SpaInformations } from "src/model/SpaInformations";
import axios from "axios";

export default function Settings() {
    const [spaInformations, setSpaInformations] = useState<SpaInformations>();
    useEffect(() => {
        axios.get('/api/v1/spa-informations')
            .then((result) => {
                setSpaInformations(result.data)
            })
            .catch(function (error) {
                alert(error.error.message)
            })
            .finally(function () {
                // always executed
            });
    }, [])

    return (<Row>
        <Col sm={6}>
            <Card>
                <Card.Header>WIFI</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {spaInformations ?
                            <div>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">RSSI</InputGroup.Text>
                                    <Form.Control
                                        disabled={true}
                                        defaultValue={spaInformations.rssi}
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Version</InputGroup.Text>
                                    <Form.Control
                                        disabled={true}
                                        defaultValue={spaInformations.version}
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">IP</InputGroup.Text>
                                    <Form.Control
                                        disabled={true}
                                        defaultValue={spaInformations.ip}
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                            </div>
                            : <></>}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>

        <Col sm={6}>
            <Card>
                <Card.Header>SPA</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {spaInformations ?
                            <div>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Modele</InputGroup.Text>
                                    <Form.Control
                                        disabled={true}
                                        defaultValue={spaInformations.model}
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Statut</InputGroup.Text>
                                    <Form.Control
                                        disabled={true}
                                        defaultValue={spaInformations.spaStatus}
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                            </div>
                            : <></>}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    </Row>);
}