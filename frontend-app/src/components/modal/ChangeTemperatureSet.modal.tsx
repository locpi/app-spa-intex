import { useEffect, useState } from "react";
import { Form, Modal, InputGroup, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import axios from "axios";

export class ChangeTemperatureSetModalParam {
    show: boolean = false;
    setShow: any;
}


export default function ChangeTemperatureSetModal({ setShow, show }: ChangeTemperatureSetModalParam) {

    const [edit, setEdit] = useState(false);
    const [tempSet, setTempSet] = useState<string>('-1');



    const onHide = () => {
        setShow(false)
    }

    const saveTempSet = () => {
        axios.post('/api/v1/temperature-set', { expected: tempSet })
            .then((result) => {
                setEdit(false)
            })
            .catch(function (error) {
                alert(error.error.message)
            })
    }

    useEffect(() => {
        axios.get('/api/v1/temperature')
            .then((result) => {
                const array = result.data;
                if (array.length > 0) {
                    setTempSet(array[0].expected)
                }
            })
            .catch(function (error) {
                alert(error.error.message)
            })
    }, [])

    return (
        <Form >
            <Modal show={show} onHide={onHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Gestion temperature</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon3">
                                Temperature souhaitée
                            </InputGroup.Text>
                            <Form.Control onChange={(e) => setTempSet(e.target.value)} defaultValue={tempSet} disabled={!edit} id="basic-url" aria-describedby="basic-addon3" />
                            {edit ?
                                <Button onClick={saveTempSet} ><FaCheck /></Button> :
                                <Button onClick={() => setEdit(true)}><MdEdit /></Button>

                            }
                        </InputGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide} variant="primary" type="submit">
                        Fermer
                    </Button>
                </Modal.Footer>
            </Modal>
        </Form>
    )
}
