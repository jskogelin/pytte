"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Module_instances, _Module_runFunctionExport, _Module_runObjectExport;
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const it_1 = __importStar(require("./it"));
const assert_1 = __importDefault(require("./assert"));
class Module {
    constructor(dirname, targetDir, filename) {
        _Module_instances.add(this);
        this.filename = filename;
        this.path = path_1.default.resolve(dirname, targetDir.replace("/", ""), filename);
        this.tests = {};
        this.errors = [];
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const module = yield (_a = this.path, Promise.resolve().then(() => __importStar(require(_a))));
            if (!module.tests) {
                return;
            }
            this.tests = module.tests;
        });
    }
    logStart() {
        console.log(`🧪 ${this.filename}`);
    }
    run() {
        if (typeof this.tests === "object") {
            __classPrivateFieldGet(this, _Module_instances, "m", _Module_runObjectExport).call(this, this.tests);
        }
        else if (typeof this.tests === "function") {
            __classPrivateFieldGet(this, _Module_instances, "m", _Module_runFunctionExport).call(this, this.tests);
        }
    }
}
exports.default = Module;
_Module_instances = new WeakSet(), _Module_runFunctionExport = function _Module_runFunctionExport(tests) {
    const errors = [];
    const localIt = (0, it_1.wrappedIt)(errors);
    tests(localIt, assert_1.default);
    this.errors.push(...errors);
}, _Module_runObjectExport = function _Module_runObjectExport(tests) {
    const testDescriptions = Object.keys(tests);
    for (const test of testDescriptions) {
        try {
            (0, it_1.default)(test, tests[test]);
        }
        catch (err) {
            this.errors.push(err); // TODO: this does not feel right
        }
    }
};
