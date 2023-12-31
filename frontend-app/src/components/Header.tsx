import axios from "axios";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { SpaInformations } from "src/model/SpaInformations";
import './css/Header.css'
export default function Header() {

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

    return (<div>
        <Row className='header'>
            <Col>
                <h1 className={"title"}>
                    {spaInformations ? spaInformations.model : <></>}

                </h1>

            </Col>

        </Row>

    </div>)
}

