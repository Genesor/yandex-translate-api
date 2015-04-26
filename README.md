# yandex-translate-api

[Yandex.Translate](https://tech.yandex.com/translate/) API client for node.js

Please use [API key request form](https://tech.yandex.com/keys/get/?service=trnsl) to obtain key.

## Install

```
npm install yandex-translate-api --save
```

## Use the client
```js
var translate = require('yandex-translate-api')(YOUR_API_KEY);
translate('I like fresh baked bread', { to: 'ru'}, function(err, res) {
  console.log(res.text);
});

translate.detect('J\'aime le pain frais', function(err, res) {
   console.log(res.lang)
});
```

# License
MIT.

Yandex.Translate terms of service: http://legal.yandex.com/translate_api/

# See also
Inspired by [yandex-translate](https://github.com/sidorares/yandex-translate) by @sidorares

