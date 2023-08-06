import { parseArgs } from "node:util";

import path from "path";

import Suite from "./src/suite";
import Module from "./src/module";

const {
  values: { dir },
} = parseArgs({
  options: {
    dir: {
      type: "string",
      short: "d",
    },
  },
});

async function main() {
  if (!dir) return;

  const suite = new Suite(dir);

  await suite.scan();

  suite.logStart();

  for (const filename of suite.filelist) {
    const module = new Module(__dirname, dir, filename);
    module.logStart();
    await module.setup();
    module.run();

    suite.report(module);
  }

  suite.logEnd();
}

main();
