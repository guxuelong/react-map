'use strict';

var loadJS = function loadJS(src, callback) {
  var script = document.createElement('script');
  var head = document.getElementsByTagName('head')[0];
  var loaded = undefined;

  script.src = src;

  if (typeof callback === 'function') {
    script.onload = script.onreadystatechange = function () {
      if (!loaded && (!script.readyState || /loaded|complete/.test(script.readyState))) {
        script.onload = script.onreadystatechange = null;
        loaded = true;
        callback();
      }
    };
  }

  head.appendChild(script);
};

module.exports = loadJS;