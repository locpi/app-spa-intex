"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaProgrammerModalBody = exports.SpaProgrammerModalParam = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Button_1 = __importDefault(require("react-bootstrap/Button"));
const Modal_1 = __importDefault(require("react-bootstrap/Modal"));
const Form_1 = __importDefault(require("react-bootstrap/Form"));
const InputGroup_1 = __importDefault(require("react-bootstrap/InputGroup"));
const axios_1 = __importDefault(require("axios"));
class SpaProgrammerModalParam {
    show = false;
    handleClose;
}
exports.SpaProgrammerModalParam = SpaProgrammerModalParam;
class SpaProgrammerModalBody {
    date = new Date();
    temperature = 40;
}
exports.SpaProgrammerModalBody = SpaProgrammerModalBody;
function SpaProgrammerModal({ show, handleClose }) {
    const spaProgrammerModalBody = new SpaProgrammerModalBody();
    const registerSession = (spaProgrammerModalBody) => {
        createSession(spaProgrammerModalBody);
    };
    function createSession(body) {
        axios_1.default.post('/api/v1/register-session', body)
            .then(function () {
            handleClose();
        })
            .catch(function (error) {
            alert(error.error.message);
        })
            .finally(function () {
            // always executed
        });
    }
    return ((0, jsx_runtime_1.jsx)(Form_1.default, { children: (0, jsx_runtime_1.jsxs)(Modal_1.default, { show: show, onHide: handleClose, children: [(0, jsx_runtime_1.jsx)(Modal_1.default.Header, { closeButton: true, children: (0, jsx_runtime_1.jsx)(Modal_1.default.Title, { children: "Programmer une session" }) }), (0, jsx_runtime_1.jsxs)(Modal_1.default.Body, { children: [(0, jsx_runtime_1.jsxs)(InputGroup_1.default, { size: "lg", children: [(0, jsx_runtime_1.jsx)(InputGroup_1.default.Text, { id: "inputGroup-sizing-lg", children: "Date" }), (0, jsx_runtime_1.jsx)(Form_1.default.Control, { defaultValue: spaProgrammerModalBody.date.toString(), onChange: (e) => spaProgrammerModalBody.date = new Date(e.target.value), type: 'datetime-local', "aria-label": "Large", "aria-describedby": "inputGroup-sizing-sm" })] }), (0, jsx_runtime_1.jsxs)(InputGroup_1.default, { size: "lg", children: [(0, jsx_runtime_1.jsx)(InputGroup_1.default.Text, { id: "inputGroup-sizing-lg", children: "Temp\u00E9rature" }), (0, jsx_runtime_1.jsx)(Form_1.default.Control, { defaultValue: spaProgrammerModalBody.temperature, onChange: (e) => spaProgrammerModalBody.temperature = Number(e.target.value), type: 'number', "aria-label": "Large", "aria-describedby": "inputGroup-sizing-sm" })] })] }), (0, jsx_runtime_1.jsxs)(Modal_1.default.Footer, { children: [(0, jsx_runtime_1.jsx)(Button_1.default, { variant: "secondary", onClick: handleClose, children: "Annuler" }), (0, jsx_runtime_1.jsx)(Button_1.default, { variant: "primary", onClick: () => registerSession(spaProgrammerModalBody), type: "submit", children: "Enregistrer" })] })] }) }));
}
exports.default = SpaProgrammerModal;
//# sourceMappingURL=SpaProgrammer.modal.js.map