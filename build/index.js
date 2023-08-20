"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_util_1 = require("node:util");
const suite_1 = __importDefault(require("./src/suite"));
const module_1 = __importDefault(require("./src/module"));
const { values: { dir }, } = (0, node_util_1.parseArgs)({
    options: {
        dir: {
            type: "string",
            short: "d",
        },
    },
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!dir)
            return;
        const suite = new suite_1.default(dir);
        yield suite.scan();
        suite.logStart();
        for (const filename of suite.filelist) {
            const module = new module_1.default(__dirname, dir, filename);
            module.logStart();
            yield module.setup();
            module.run();
            suite.report(module);
        }
        suite.logEnd();
    });
}
main();
