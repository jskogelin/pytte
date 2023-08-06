import AssertionError from "./error/assertion";

export default function asrt(assertion: Boolean) {
  if (!assertion) {
    throw new AssertionError("Assertion failed");
  }
}
