var request = require('request');
var endpoint = 'https://translate.yandex.net/api/v1.5/tr.json';

var jsonRequest = function(url, params, cb) {
  var handler = function(err, res) {
    if (err)
      return cb(err);
    var obj;
    try {
      obj = JSON.parse(res.body);
    } catch(e) {
      cb(e);
    }
    cb(null, obj);
  };
  if (params.get === true)
    request.get(url, handler);
  else
    request.post(url, params, handler);
};

module.exports = function (apiKey) {
    var module = {};

    module.detect = function(text, opts, cb) {
      var topts = typeof opts;
      if (topts == 'function' || topts == 'undefined') {
        if (topts == 'function')
          cb = opts;
        opts = {
          format: 'text'
        };
      }
      if (!opts.format)
        opts.format = 'text';
      if (!opts.key)
        opts.key    = apiKey;
      jsonRequest(endpoint + '/detect', {
            form: {
              text: text,
              key: opts.key,
              format: opts.format
            }
         }, cb);
    };

    module.getLanguages = function(cb) {
      jsonRequest(endpoint + '/getLangs', { get: true }, cb);
    };
  
    module.translate  = function(text, opts, cb) {
      var topts = typeof opts;
      if (topts == 'function' || topts == 'undefined') {
        if (topts == 'function')
          cb = opts;
        opts = {
          to: 'en',
          format: 'text'
        };
      }
      if (!opts.to)
        opts.to     = 'en';
      if (!opts.format)
        opts.format = 'text';
      if (!opts.key)
        opts.key    = apiKey;
      jsonRequest(endpoint + '/translate', {
          form: {
            text: text,
            key: opts.key,
            format: opts.format,
            lang: opts.from ? opts.from + '-' + opts.to : opts.to
          }
      }, cb);
    };

    return module;
};