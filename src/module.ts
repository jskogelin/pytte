import path from "path";
import it, { wrappedIt } from "./it";
import asrt from "./assert";
import AssertionError from "./error/assertion";

export default class Module {
  filename: string;
  path: string;
  tests: Record<string, Function> | Function;
  errors: AssertionError[];
  loaded: boolean;

  constructor(targetDir: string, filename: string) {
    this.filename = filename;
    this.path = path.resolve(targetDir.replace("/", ""), filename);
    this.tests = {};
    this.errors = [];
    this.loaded = false;
  }

  async setup() {
    let module;
    try {
      module = await import(this.path);
    } catch (err) {
      return;
    }

    if (!module?.tests) {
      return;
    }

    this.tests = module.tests;
    this.loaded = true;
  }

  logStart() {
    console.log(`🧪 ${this.filename}`);
  }

  run() {
    if (typeof this.tests === "object") {
      this.#runObjectExport(this.tests);
    } else if (typeof this.tests === "function") {
      this.#runFunctionExport(this.tests);
    }
  }

  #runFunctionExport(tests: Function) {
    const errors: AssertionError[] = [];
    const localIt = wrappedIt(errors);
    tests(localIt, asrt);
    this.errors.push(...errors);
  }

  #runObjectExport(tests: Record<string, Function>) {
    const testDescriptions = Object.keys(tests);

    for (const test of testDescriptions) {
      try {
        it(test, tests[test]);
      } catch (err) {
        this.errors.push(err as AssertionError); // TODO: this does not feel right
      }
    }
  }
}
