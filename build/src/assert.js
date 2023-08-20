"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assertion_1 = __importDefault(require("./error/assertion"));
function asrt(assertion) {
    if (!assertion) {
        throw new assertion_1.default("Assertion failed");
    }
}
exports.default = asrt;
