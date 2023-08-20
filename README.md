## 🧚 PYTTE TINY TEST RUNNER 🧚

```bash
npm i --save-dev pytte
```

A light weight test runner made for running tests inside source files

Like so

```javascript
export function addNumbers(a, b) {
  return a + b;
}

// Export a "tests" object from your file
export const tests = {
  "should run a test in an object": (assert) => {
    assert(addNumbers(1, 2) === 3);
  },
};

// Or a function
export function tests(it, assert) {
  it("should run a test in a function", () => {
    assert(addNumbers(1, 2) === 3);
  });
}
```

Then use it with

```bash
pytte -d path/to/your/sourcefiles/
```
