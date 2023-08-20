"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startRun = void 0;
const it_1 = __importDefault(require("./it"));
function startRun(module) {
    if (typeof module.tests === "object") {
        runObjectExport(module.tests);
    }
    else if (typeof module.tests === "function") {
        runFunctionExport(module.tests);
    }
}
exports.startRun = startRun;
function runFunctionExport(suite) {
    suite(it_1.default);
}
function runObjectExport(suite) {
    const tests = Object.keys(suite);
    for (const test of tests) {
        (0, it_1.default)(test, suite[test]);
    }
}
