function createReport(prefix: string, suffix: string, color: string) {
  return (test: string) => {
    console.log(`    \x1b[${color} ${prefix} ${test} ${suffix} \x1b[0m`);
  };
}

const success = createReport("✅", "", "32m");
const fail = createReport("🚨", "", "31m");

export default function report(test: string, result: Boolean | Error) {
  if (result instanceof Error) {
    fail(test);
  } else if (result === true) {
    success(test);
  }
}
