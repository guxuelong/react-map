'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _utilsLoadJS = require('./utils/loadJS');

var _utilsLoadJS2 = _interopRequireDefault(_utilsLoadJS);

// 地图类型(街道、卫星图像、卫星图像上的主要街道透明层)
var MAPE_TYPES = { '1': 'ROADMAP', '2': 'SATELLITE', '3': 'HYBRID' };

var Map = (function (_Component) {
  _inherits(Map, _Component);

  function Map(props) {
    _classCallCheck(this, Map);

    _get(Object.getPrototypeOf(Map.prototype), 'constructor', this).call(this, props);
  }

  _createClass(Map, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this = this;

      var url = 'https://apis.map.qq.com/api/js?v=2.exp&s=1&libraries=convertor,geometry&callback=init';
      this.props.key && (url += '&key=' + this.props.key);
      (0, _utilsLoadJS2['default'])(url);
      window.init = function () {
        _this.createMap();
        _this.setCenter();
      };
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      // 创建地图
      this.createMap();
      this.setCenter();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var width = _props.width;
      var // 地图宽度
      height = _props.height;
      var //地图高度（必填）
      mapTypeId = _props.mapTypeId;
      var //地图类型
      className = _props.className;
      var centerIndex = _props.centerIndex;

      var others = _objectWithoutProperties(_props, ['width', 'height', 'mapTypeId', 'className', 'centerIndex']);

      var cls = (0, _classnames3['default'])(_defineProperty({
        'comp-qqmap': true
      }, className, !!className));
      return _react2['default'].createElement('div', _extends({ ref: 'map', className: cls }, others, { style: { width: width, height: height } }));
    }
  }, {
    key: 'createMap',
    value: function createMap() {
      var _this2 = this;

      // 获取坐标数据数组
      var lnglats = [];
      _react2['default'].Children.map(this.props.children, function (child) {
        lnglats.push({
          lng: child.props.lng,
          lat: child.props.lat,
          label: child.props.label
        });
      });
      if (!lnglats.length) {
        return;
      }
      // 计算最大最小经纬度
      var maxLng = lnglats[0].lng,
          minLng = lnglats[0].lng,
          maxLat = lnglats[0].lat,
          minLat = lnglats[0].lat;
      for (var key in lnglats) {
        var res = lnglats[key];
        if (res.lng > maxLng) maxLng = res.lng;
        if (res.lng < minLng) minLng = res.lng;
        if (res.lat > maxLat) maxLat = res.lat;
        if (res.lat < minLat) minLat = res.lat;
      }

      // 计算地图中心点，注意 parseFloat
      var cenLat = (parseFloat(maxLat) + parseFloat(minLat)) / 2;
      var cenLng = (parseFloat(maxLng) + parseFloat(minLng)) / 2;
      //通过经纬度计算缩放级别
      var getZoom = function getZoom(maxJ, minJ, maxW, minW) {
        if (maxJ == minJ && maxW == minW) return 13;
        var diff = maxJ - minJ;
        if (diff < (maxW - minW) * 2.1) diff = (maxW - minW) * 2.1;
        diff = parseInt(10000 * diff) / 10000;
        var zoomArr = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
        var diffArr = new Array(180, 90, 45, 22, 11, 5.5, 2.75, 1.37, 0.68, 0.34, 0.17, 0.08, 0.04);
        for (var i = 0; i < diffArr.length; i++) {
          if (diff - diffArr[i] >= 0) {
            return zoomArr[i];
          }
        }
        return 14;
      };
      if (!this.map) {
        this.map = new qq.maps.Map(this.refs.map, {
          zoomControl: false,
          mapTypeId: qq.maps.MapTypeId[MAPE_TYPES[this.props.mapTypeId]],
          center: new qq.maps.LatLng(cenLat, cenLng),
          zoom: getZoom(maxLat, minLat, maxLng, minLng), // 计算缩放级别
          backgroundColor: '#fff'
        });
      }
      if (localStorage.locateInfo && !this.marker) {
        //this.marker && this.marker.setMap(null);                                                           
        var locate = JSON.parse(localStorage.locateInfo);

        var anchor = new qq.maps.Point(25, 25),
            size = new qq.maps.Size(50, 50),
            origin = new qq.maps.Point(0, 0),
            icon = new qq.maps.MarkerImage(require("./locate.png"), size, origin, anchor);
        /*标注*/
        this.marker = new qq.maps.Marker({
          position: new qq.maps.LatLng(locate.lat, locate.lng),
          draggable: false, /*拖动*/
          map: this.map
        });
        this.marker.setIcon(icon);
        // new qq.maps.Label({
        //     position: new qq.maps.LatLng(locate.lat, locate.lng),
        //     map: this.map,
        //     content: '',
        //     style:{color:"#fff",fontSize:"14px",padding: "0px 0px 0px 2px", border: "4px solid #eee", backgroundColor: '#636363', width: "20px", height: "20px", borderRadius: "50%", zIndex: "999" },
        //     offset:new qq.maps.Size(-15,-25)
        // });
      }
      lnglats.map(function (item, index) {
        // /*标注*/
        new qq.maps.Marker({
          position: new qq.maps.LatLng(item.lat, item.lng),
          draggable: false, /*拖动*/
          map: _this2.map
        });
        /*标注Label*/
        item.label && new qq.maps.Label({
          position: new qq.maps.LatLng(item.lat, item.lng),
          map: _this2.map,
          content: item.label,
          style: { borderBottomRightRadius: '5px', borderTopLeftRadius: '5px' },
          offset: new qq.maps.Size(15, -30)
        });
      });
    }
  }, {
    key: 'setCenter',
    value: function setCenter() {
      var _this3 = this;

      _react2['default'].Children.map(this.props.children, function (child, index) {
        if (index == _this3.props.selected) {
          _this3.map.panTo(new qq.maps.LatLng(child.props.lat, child.props.lng));
        }
      });
    }
  }]);

  return Map;
})(_react.Component);

Map.propTypes = {
  key: _react.PropTypes.string,
  className: _react.PropTypes.string
};

Map.defaultProps = {
  key: '', // 付费密钥
  className: null, // 地图容器样式
  width: '100%', // 地图容器宽度
  height: 300, // 地图容器高度
  mapTypeId: 1, // 地图类型
  centerIndex: 0 };

// 地图中心

exports['default'] = Map;
module.exports = exports['default'];
// 地图中心的坐标点