import { useEffect, useState } from "react";
import { Card, ListGroup, Badge, Button } from "react-bootstrap";
import SpaProgrammerModal, { SpaProgrammerModalBody } from "./modal/SpaProgrammer.modal";
import axios from "axios";
import moment from 'moment';



export default function HeaterProgrammation() {

    const [show, setShow] = useState(false);
    const [heaterProgrammationBody, setHeaterProgrammationBody] = useState<SpaProgrammerModalBody[]>([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        axios.get('/api/v1/register-session').then((result) => {
            setHeaterProgrammationBody(result.data)
        })
    }, [])

    const addHeater = (body: SpaProgrammerModalBody) => {
        heaterProgrammationBody.push(body)
    }

    const deleteElem = (elem: SpaProgrammerModalBody) => {
        axios.delete('/api/v1/register-session/' + elem._id)
            .then(() => {
                axios.get('/api/v1/register-session').then((result) => {
                    setHeaterProgrammationBody(result.data)
                })
            })
            .catch(function (error) {
                alert(error.error.message)
            })
            .finally(function () {
                // always executed
            });
    }

    return (<div><Card className="text-center" style={{ color: "white", backgroundColor: "rgb(10,20,58)", width: '100%' }}>
        <Card.Title>Programmation de chauffe</Card.Title>
        <Card.Body>
            <ListGroup as="ol">
                {heaterProgrammationBody ?
                    heaterProgrammationBody.map(elem =>
                        <ListGroup.Item onDoubleClick={() => deleteElem(elem)} key={elem.date.toString()} as="li" className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{moment(elem?.date).format('DD/MM/YYYY HH:mm')}</div>
                            </div>
                            <Badge bg="primary" pill>
                                {elem.temperature}°C
                            </Badge>
                        </ListGroup.Item>) : <></>
                }
            </ListGroup>
        </Card.Body>
        <Card.Footer className="text-muted">
            <Button variant="primary" style={{ backgroundColor: "rgb(10,20,61)", width: '100%' }} onClick={handleShow}>
                Programmer une session
            </Button>
        </Card.Footer>
    </Card>
        <SpaProgrammerModal handleClose={handleClose} show={show} addHeater={addHeater} /></div>
    )

}