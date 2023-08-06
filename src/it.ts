import AssertionError from "./error/assertion";
import asrt from "./assert";
import report from "./reporter";

export default function it(description: string, callback: Function) {
  let result: boolean | Error;
  try {
    callback(asrt);
    result = true;
  } catch (err: any) {
    result = err;
  }

  report(description, result);

  if (result instanceof Error) {
    throw result;
  }
}

export function wrappedIt(errors: AssertionError[]) {
  return (description: string, callback: Function) => {
    try {
      it(description, callback);
    } catch (err) {
      errors.push(err as AssertionError);
    }
  };
}
