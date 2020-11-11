var { fft, ifft } = require('fft-js');

function autoc(signal) {
  return [];
}

function autocovariance(signal) {
  var ifftPSD = ifft(powerSpectralDensity(signal));
  // TODO: ifft needs complex numbers.
  var ifftPSDDivided = ifftPSD.map(divByLength);
  console.log(ifftPSD, ifftPSDDivided);
  return ifftPSDDivided.map(getReal);

  function divByLength(n) {
    return n / signal.length;
  }
}

function powerSpectralDensity(signal) {
  var centered = centerSignal(signal);

  // Array of two-element arrays representing complex
  // numbers.
  var ftSignal = fft(centered);

  var absFtSignal = ftSignal.map(abs);
  return absFtSignal.map(sq);
}

function centerSignal(signal) {
  const avg = mean(signal);
  return signal.map(subtractMean);

  function subtractMean(n) {
    return n - avg;
  }
}

function mean(signal) {
  return signal.reduce(add, 0) / signal.length;
}

function add(a, b) {
  return a + b;
}

function abs(X) {
  return Math.sqrt(X[0] * X[0] + X[1] + X[1]);
}

function getReal(X) {
  return X[0];
}

function sq(n) {
  return n * n;
}

module.exports = {
  autoc,
  autocovariance,
  powerSpectralDensity,
  centerSignal,
  mean
};
