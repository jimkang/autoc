var { fft, ifft } = require('fft-js');
var { getVectorMagnitude } = require('basic-2d-math');

function autoc(signal) {
  return [];
}

function autocovariance(signal) {
  var ifftPSD = ifft(powerSpectralDensity(signal).map(formatAsComplex));
  var ifftPSDDivided = ifftPSD.map(divByLength);
  return ifftPSDDivided.map(getReal);

  function divByLength(n) {
    return [n[0] / signal.length, n[1] / signal.length];
  }
}

function powerSpectralDensity(signal) {
  var centered = centerSignal(signal);

  // Array of two-element arrays representing complex
  // numbers.
  var ftSignal = fft(centered);

  var absFtSignal = ftSignal.map(getVectorMagnitude);
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

function getReal(X) {
  return X[0];
}

function sq(n) {
  return n * n;
}

function formatAsComplex(n) {
  return [n, 0];
}

module.exports = {
  autoc,
  autocovariance,
  powerSpectralDensity,
  centerSignal,
  mean
};
