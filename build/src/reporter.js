"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createReport(prefix, suffix, color) {
    return (test) => {
        console.log(`    \x1b[${color} ${prefix} ${test} ${suffix} \x1b[0m`);
    };
}
const success = createReport("✅", "passed", "32m");
const fail = createReport("🚨", "failed", "31m");
function report(test, result) {
    if (result instanceof Error) {
        fail(test);
    }
    else if (result === true) {
        success(test);
    }
}
exports.default = report;
