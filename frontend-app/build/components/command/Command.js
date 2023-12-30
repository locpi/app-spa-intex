"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cammnd = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
require("./Command.css");
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
class Cammnd {
    status;
    constructor(status) {
        this.status = status;
    }
}
exports.Cammnd = Cammnd;
function Command({ name, icon, setPower }) {
    const [command, setCommand] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        getData();
    }, []);
    function notifyPower(status) {
        if (setPower) {
            if (status === 'on') {
                setPower(true);
            }
            else {
                setPower(false);
            }
        }
    }
    function getData() {
        axios_1.default.get('/api/v1/command/' + name)
            .then(function (response) {
            const data = response.data[0];
            setCommand(data);
            notifyPower(data.status);
        })
            .catch(function (error) {
            // handle error
            console.log(error);
        })
            .finally(function () {
            // always executed
        });
    }
    function update(state) {
        axios_1.default.post('/api/v1/command', { command: name, status: state })
            .then(function (response) {
            const data = response.data;
        })
            .catch(function (error) {
            // handle error
            console.log(error);
        })
            .finally(function () {
            // always executed
        });
    }
    function changeState() {
        if (command.status === 'on') {
            command.status = 'off';
        }
        else {
            command.status = 'on';
        }
        notifyPower(command.status);
        const commandUpdate = new Cammnd(command.status);
        setCommand(command => ({
            ...command,
            ...commandUpdate
        }));
        update(command.status);
    }
    function getBackgroundColor() {
        switch (command?.status) {
            case "on": return "rgb(38, 143, 38)";
            case "standby": return "rgb(191, 146, 33)";
            case "off": return "rgb(124, 129, 124)";
        }
    }
    function active() {
        if (command?.status === 'on') {
            return "icon-active";
        }
        if (command?.status === 'standby') {
            return "icon-standby";
        }
        return "icon-inactive";
    }
    return (command ?
        (0, jsx_runtime_1.jsx)("div", { onClick: changeState, className: 'button-action', children: (0, jsx_runtime_1.jsx)("div", { className: 'icon ' + active(), children: icon }) })
        : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}));
}
exports.default = Command;
//# sourceMappingURL=Command.js.map