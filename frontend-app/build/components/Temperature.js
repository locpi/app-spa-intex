"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemperatureItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("./css/Temperature.css");
const react_gauge_component_1 = __importDefault(require("react-gauge-component"));
const react_bootstrap_1 = require("react-bootstrap");
const moment_1 = __importDefault(require("moment"));
class TemperatureItem {
    date;
    actual;
}
exports.TemperatureItem = TemperatureItem;
function Temperature() {
    const [temperature, setTemperature] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
    }, []);
    return ((0, jsx_runtime_1.jsx)("div", { className: 'justify-content-sm-center', children: (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Row, { children: [(0, jsx_runtime_1.jsx)(react_gauge_component_1.default, { type: "semicircle", arc: {
                        width: 0.2,
                        padding: 0.005,
                        cornerRadius: 1,
                        // gradient: true,
                        subArcs: [
                            {
                                limit: 15,
                                color: 'rgb(85,175,232)',
                                showTick: true
                            },
                            {
                                limit: 25,
                                color: 'rgb(79,200,37)',
                                showTick: true,
                            },
                            {
                                limit: 35,
                                color: 'rgb(229,235,7)',
                                showTick: true
                            },
                            {
                                color: 'rgb(221,26,11)'
                            }
                        ]
                    }, pointer: {
                        color: '#345243',
                        length: 0.80,
                        width: 10,
                    }, labels: {
                        valueLabel: { matchColorWithArc: true, formatTextValue: value => value + 'ºC' },
                        tickLabels: {
                            type: 'inner',
                            defaultTickValueConfig: { formatTextValue: (value) => value + 'ºC' }
                        }
                    }, value: temperature?.actual, minValue: 0, maxValue: 40 }), (0, jsx_runtime_1.jsxs)("span", { className: 'last-refresh', children: ["Derniere actualisation : ", (0, moment_1.default)(temperature?.date).format('DD/MM/YYYY HH:mm') // December 28th 2023, 4:14:23 pm
                    ] })] }) }));
}
exports.default = Temperature;
//# sourceMappingURL=Temperature.js.map