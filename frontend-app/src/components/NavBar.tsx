import { Col, ListGroup, Row } from "react-bootstrap";
import './css/NavBar.css';
import { IoMdHome } from "react-icons/io";
import { Link } from "react-router-dom";
import { IoIosSettings } from "react-icons/io";
import { AiOutlineSchedule } from "react-icons/ai";

export default function NavBar() {


    return (
        <Row className="block-nav">
            <Col>
                <ListGroup horizontal>
                    <ListGroup.Item className="item">
                        <Link to={"/"}>
                            <IoMdHome />
                        </Link>
                    </ListGroup.Item>

                    <ListGroup.Item className="item">
                        <Link to={"/schedule"}>
                            <AiOutlineSchedule />
                        </Link>
                    </ListGroup.Item>
                    <ListGroup.Item className="item">
                        <Link to={"/settings"}>
                            <IoIosSettings />
                        </Link>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
    )
}
