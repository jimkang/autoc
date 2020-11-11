autoc
==================

Inspired by [node-autocorrelation](https://github.com/MaximilianBuegler/node-autocorrelation), this is an implementation of autocorrelation as [explained by Thibauld Nion](https://etudes.tibonihoo.net/literate_musing/autocorrelations.html). I'm implementing it in order to understand it.

Installation
------------

Add the following to the .npmrc in your project:

    @jimkang:registry=https://npm.pkg.github.com/jimkang

Then:

    npm install @jimkang/autoc

Usage
-----

    var { autoc } = require('@jimkang/autoc');

    console.log(autoc([1, 0, 1, 0, 1, 0, 1, 0]));

Output:

    [1, -1, 1, -1, 1, -1, 1, -1]

Tests
-----

Run tests with `make test`.

License
-------

The MIT License (MIT)

Copyright (c) 2020 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
