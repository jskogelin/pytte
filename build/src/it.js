"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrappedIt = void 0;
const assert_1 = __importDefault(require("./assert"));
const reporter_1 = __importDefault(require("./reporter"));
function it(description, callback) {
    let result;
    try {
        callback(assert_1.default);
        result = true;
    }
    catch (err) {
        result = err;
    }
    (0, reporter_1.default)(description, result);
    if (result instanceof Error) {
        throw result;
    }
}
exports.default = it;
function wrappedIt(errors) {
    return (description, callback) => {
        try {
            it(description, callback);
        }
        catch (err) {
            errors.push(err);
        }
    };
}
exports.wrappedIt = wrappedIt;
