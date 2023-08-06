export function tests(it: Function, asrt: Function) {
  it("should pass with a function export", () => {
    asrt(true);
  });

  it("should fail with a function export", () => {
    asrt(false);
  });
}
