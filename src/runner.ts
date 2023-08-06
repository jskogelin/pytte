import it from "./it";

export function startRun(module: any) {
  if (typeof module.tests === "object") {
    runObjectExport(module.tests);
  } else if (typeof module.tests === "function") {
    runFunctionExport(module.tests);
  }
}

function runFunctionExport(suite: Function) {
  suite(it);
}

function runObjectExport(suite: Record<string, Function>) {
  const tests = Object.keys(suite);

  for (const test of tests) {
    it(test, suite[test]);
  }
}
