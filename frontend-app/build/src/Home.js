"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Temperature_1 = __importDefault(require("../components/Temperature"));
const Command_1 = __importDefault(require("../components/command/Command"));
const ri_1 = require("react-icons/ri");
require("../assets/styles/tile.css");
require("./Home.css");
const react_bootstrap_1 = require("react-bootstrap");
const ai_1 = require("react-icons/ai");
const io5_1 = require("react-icons/io5");
const gi_1 = require("react-icons/gi");
const SpaProgrammer_modal_1 = __importDefault(require("./modal/SpaProgrammer.modal"));
function Home() {
    const [power, setPower] = (0, react_1.useState)(false);
    const [show, setShow] = (0, react_1.useState)(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'home', children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Row, { className: 'header', children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.Col, { children: (0, jsx_runtime_1.jsx)("h1", { className: "title", children: "INTEX" }) }) }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Row, { children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.Col, { sm: 6, children: (0, jsx_runtime_1.jsx)(Temperature_1.default, {}) }) }), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Row, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Col, { children: (0, jsx_runtime_1.jsx)(Command_1.default, { name: 'power', label: 'Allumer', icon: (0, jsx_runtime_1.jsx)(io5_1.IoPowerSharp, {}), setPower: setPower }) }), power ?
                        (0, jsx_runtime_1.jsx)(react_bootstrap_1.Col, { children: (0, jsx_runtime_1.jsx)(Command_1.default, { name: "filter", label: 'Filtration', icon: (0, jsx_runtime_1.jsx)(gi_1.GiWaterRecycling, {}), setPower: null }) }) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})] }), power ?
                (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Row, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Col, { children: (0, jsx_runtime_1.jsx)(Command_1.default, { name: 'heater', label: 'Chauffe', icon: (0, jsx_runtime_1.jsx)(ai_1.AiOutlineFire, {}), setPower: null }) }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Col, { children: (0, jsx_runtime_1.jsx)(Command_1.default, { name: 'bubble', label: 'Bulles', icon: (0, jsx_runtime_1.jsx)(ri_1.RiBubbleChartLine, {}), setPower: null }) })] }) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Row, { style: { marginTop: '5%' }, children: (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Col, { sm: 12, children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, { variant: "primary", style: { backgroundColor: "rgb(10,20,61)", width: '100%' }, onClick: handleShow, children: "Programmer une session" }), (0, jsx_runtime_1.jsx)(SpaProgrammer_modal_1.default, { handleClose: handleClose, show: show })] }) })] }));
}
exports.default = Home;
//# sourceMappingURL=Home.js.map