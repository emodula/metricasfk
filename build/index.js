"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./app/server"));
const simulador_1 = __importDefault(require("./app/simulador"));
const json_to_prometh_1 = __importDefault(require("./app/json_to_prometh"));
const exporter_1 = __importDefault(require("./app/exporter"));
switch (process.argv[2]) {
    case 'server':
        (0, server_1.default)();
        break;
    case 'simulador':
        (0, simulador_1.default)();
        break;
    case 'convert':
        (0, json_to_prometh_1.default)();
        break;
    case 'exporter':
        (0, exporter_1.default)();
        break;
}
