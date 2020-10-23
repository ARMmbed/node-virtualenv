// Vendored from https://github.com/lukaszb/pypi/commit/85d384a96ee2ee90c73c8e8f1235377b71465c39

// Copyright (c) 2011 Lukasz Balcerzak

// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:

// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.

// Authors ordered by first contribution
// - Lukasz Balcerzak <lukaszbalcerzak@gmail.com>
// - Kenneth Falck <kennu@iki.fi>

var https = require('https');

var DEFAULT_HOST = 'pypi.org';

function Client(url) {
  if (url == null) {
    url = DEFAULT_HOST;
  }
  this.url = url;
}

Client.prototype.get = function(path, callback, onError) {
  const options = {
    host: this.url,
    path: path
  };

  const req = https.get(options, res => {
    res.setEncoding('utf-8');
    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => callback(data));
  });
  req.on('error', error => onError(error));
};

Client.prototype.getProject = function(pkg, callback, onError) {
  return this.get(`/pypi/${pkg}/json`, callback, onError);
};

exports.Client = Client;
