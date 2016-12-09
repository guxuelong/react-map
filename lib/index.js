'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('./Map.scss');

var _MapJsx = require('./Map.jsx');

var _MapJsx2 = _interopRequireDefault(_MapJsx);

var _Marker = require('./Marker');

var _Marker2 = _interopRequireDefault(_Marker);

_MapJsx2['default'].Marker = _Marker2['default'];

exports['default'] = _MapJsx2['default'];
module.exports = exports['default'];