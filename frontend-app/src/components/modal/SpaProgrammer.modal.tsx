import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
export class SpaProgrammerModalParam {
  show: boolean = false;
  handleClose: any;
  addHeater: any;
}

export class SpaProgrammerModalBody {
  _id!: string;
  date: Date = new Date();
  temperature: number = 40;
  setHeaterProgrammationBody: any;
}

export default function SpaProgrammerModal({ show, handleClose, addHeater }: SpaProgrammerModalParam) {
  const spaProgrammerModalBody = new SpaProgrammerModalBody();
  const registerSession = (spaProgrammerModalBody: SpaProgrammerModalBody) => {
    createSession(spaProgrammerModalBody)
  }

  function createSession(body: SpaProgrammerModalBody) {
    axios.post('/api/v1/register-session', body)
      .then(function () {
        handleClose();
        addHeater(body)
      })
      .catch(function (error) {
        alert(error.error.message)
      })
      .finally(function () {
        // always executed
      });
  }

  return (
    <Form >
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Programmer une session</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">Date</InputGroup.Text>
            <Form.Control
              defaultValue={spaProgrammerModalBody.date.toString()}

              onChange={(e) => spaProgrammerModalBody.date = new Date(e.target.value)}

              type='datetime-local'
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>
          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">Température</InputGroup.Text>
            <Form.Control
              defaultValue={spaProgrammerModalBody.temperature}
              onChange={(e) => spaProgrammerModalBody.temperature = Number(e.target.value)}
              type='number'
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>



        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={() => registerSession(spaProgrammerModalBody)} type="submit">
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
  )
}
