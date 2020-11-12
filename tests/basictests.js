var test = require('tape');
var {
  autoc,
  mean,
  centerSignal,
  powerSpectralDensity,
  autocovariance
} = require('../index');

const tolerance = 0.0001;

var testCases = [
  {
    fn: mean,
    params: [[0.5, 1, 0.75, 0.1]],
    expected: 0.5875
  },
  {
    fn: centerSignal,
    params: [[-4, -12, -4, -12, -4, -12, -4, -12]],
    expected: [4, -4, 4, -4, 4, -4, 4, -4]
  },
  {
    fn: powerSpectralDensity,
    params: [[1, 0, 1, 0, 1, 0, 1, 0]],
    expected: [0, 0, 0, 0, 16, 0, 0, 0]
  },
  {
    fn: autocovariance,
    params: [[1, 0, 1, 0, 1, 0, 1, 0]],
    expected: [0.25, -0.25, 0.25, -0.25, 0.25, -0.25, 0.25, -0.25]
  },
  {
    fn: autoc,
    params: [[1, 0, 1, 0, 1, 0, 1, 0]],
    expected: [1, -1, 1, -1, 1, -1, 1, -1]
  },
  {
    name: 'Uncentered autoc',
    fn: autoc,
    params: [[-4, -12, -4, -12, -4, -12, -4, -12]],
    expected: [1, -1, 1, -1, 1, -1, 1, -1]
  }
];

testCases.forEach(runTest);

function runTest(testCase) {
  test(testCase.name || testCase.fn.name, basicTest);

  function basicTest(t) {
    var result = testCase.fn.apply(testCase.fn, testCase.params);
    if (Array.isArray(testCase.expected)) {
      t.deepEqual(result, testCase.expected, 'Result is correct.');
    } else {
      t.ok(
        Math.abs(result - testCase.expected) <= tolerance,
        `Result ${result} is within tolerance of ${testCase.expected}.`
      );
    }
    t.end();
  }
}
