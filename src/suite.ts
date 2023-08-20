import Module from "./module";
import AssertionError from "./error/assertion";
import * as fsPromises from "fs/promises";

export default class Suite {
  dir: string;
  errors: AssertionError[] = [];
  filelist: string[];

  constructor(dir: string) {
    this.dir = dir;
    this.filelist = [];
  }

  async scan() {
    if (this.dir[this.dir.length - 1] === "/") {
      let files = await fsPromises.readdir(this.dir);

      files = files.filter((file) => {
        return file.endsWith(".ts") || file.endsWith(".js");
      });

      this.filelist.push(...files);
    } else {
      this.filelist.push(this.dir);
    }
  }

  logStart() {
    console.log(`Running tests in ${this.filelist.length} files`);
  }

  logEnd() {
    console.log(`Tests finished with ${this.errors.length} errors`);
  }

  report(module: Module) {
    this.errors.push(...module.errors);
  }
}
