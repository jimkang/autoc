var { fft, ifft } = require('fft-js');
var { getVectorMagnitude } = require('basic-2d-math');
var { range } = require('d3-array');

function autoc(signal, center = true) {
  var autocov = autocovariance(signal, center);
  var variance = 0;
  if (autocov.length > 0) {
    variance = autocov[0];
  }
  if (variance === 0) {
    return range(0, signal.length, 0);
  }

  return autocov.map(divByVariance);

  function divByVariance(n) {
    return n / variance;
  }
}

function autocovariance(signal, center = true) {
  var ifftPSD = ifft(powerSpectralDensity(signal, center).map(formatAsComplex));
  var ifftPSDDivided = ifftPSD.map(divByLength);
  return ifftPSDDivided.map(getReal);

  function divByLength(n) {
    return [n[0] / signal.length, n[1] / signal.length];
  }
}

function powerSpectralDensity(signal, center = true) {
  // Array of two-element arrays representing complex
  // numbers.
  var ftSignal = fft(center ? centerSignal(signal) : signal);
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
