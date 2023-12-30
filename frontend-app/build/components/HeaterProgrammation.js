"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const SpaProgrammer_modal_1 = __importDefault(require("./modal/SpaProgrammer.modal"));
const axios_1 = __importDefault(require("axios"));
const moment_1 = __importDefault(require("moment"));
function HeaterProgrammation() {
    const [show, setShow] = (0, react_1.useState)(false);
    const [heaterProgrammationBody, setHeaterProgrammationBody] = (0, react_1.useState)([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    (0, react_1.useEffect)(() => {
        axios_1.default.get('/api/v1/register-session').then((result) => {
            setHeaterProgrammationBody(result.data);
        });
    }, []);
    const addHeater = (body) => {
        heaterProgrammationBody.push(body);
    };
    const deleteElem = (elem) => {
        axios_1.default.delete('/api/v1/register-session/' + elem._id)
            .then(() => {
            axios_1.default.get('/api/v1/register-session').then((result) => {
                setHeaterProgrammationBody(result.data);
            });
        })
            .catch(function (error) {
            alert(error.error.message);
        })
            .finally(function () {
            // always executed
        });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)(react_bootstrap_1.Card, { className: "text-center", style: { color: "white", backgroundColor: "rgb(10,20,58)", width: '100%' }, children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Title, { children: "Programmation de chauffe" }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Body, { children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.ListGroup, { as: "ol", children: heaterProgrammationBody ?
                                heaterProgrammationBody.map(elem => (0, jsx_runtime_1.jsxs)(react_bootstrap_1.ListGroup.Item, { onDoubleClick: () => deleteElem(elem), as: "li", className: "d-flex justify-content-between align-items-start", children: [(0, jsx_runtime_1.jsx)("div", { className: "ms-2 me-auto", children: (0, jsx_runtime_1.jsx)("div", { className: "fw-bold", children: (0, moment_1.default)(elem?.date).format('DD/MM/YYYY HH:mm') }) }), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Badge, { bg: "primary", pill: true, children: [elem.temperature, "\u00B0C"] })] }, elem.date.toString())) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}) }) }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Footer, { className: "text-muted", children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, { variant: "primary", style: { backgroundColor: "rgb(10,20,61)", width: '100%' }, onClick: handleShow, children: "Programmer une session" }) })] }), (0, jsx_runtime_1.jsx)(SpaProgrammer_modal_1.default, { handleClose: handleClose, show: show, addHeater: addHeater })] }));
}
exports.default = HeaterProgrammation;
//# sourceMappingURL=HeaterProgrammation.js.map