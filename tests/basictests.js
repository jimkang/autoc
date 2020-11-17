var test = require('tape');
var { VALID_SIGNAL, VALID_AUTOCORRELATION } = require('./test-data');

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
    params: [[-4, -12, -4, -12, -4, -12, -4, -12], false],
    expected: [1, 0.6, 1, 0.6, 1, 0.6, 1, 0.6]
  },
  {
    name: 'autoc with a bigger signal',
    fn: autoc,
    params: [VALID_SIGNAL.slice(0, 512)],
    expected: VALID_AUTOCORRELATION.slice(0, 512)
  }
];

testCases.forEach(runTest);

function runTest(testCase) {
  test(testCase.name || testCase.fn.name, basicTest);

  function basicTest(t) {
    var result = testCase.fn.apply(testCase.fn, testCase.params);
    if (
      Array.isArray(testCase.expected) ||
      testCase.expected instanceof Float32Array
    ) {
      checkArray(t, result, testCase.expected);
    } else {
      t.ok(
        Math.abs(result - testCase.expected) <= tolerance,
        `Result ${result} is within ${tolerance} of ${testCase.expected}.`
      );
    }
    t.end();
  }
}

function checkArray(t, result, expected) {
  var mismatches = [];
  t.equal(result.length, expected.length, 'Array is correct length.');

  for (var i = 0; i < expected.length; ++i) {
    if (Math.abs(result[i] - expected[i]) > tolerance) {
      mismatches.push({ index: i, expected: expected[i], actual: result[i] });
    }
  }

  t.equal(mismatches.length, 0, 'Entire array is correct.');

  if (mismatches.length > 0) {
    console.log('Array mismatches');
    console.table(mismatches);
  }
}
