
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class QQMap extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    
    // 创建地图
    this.createMap();
    this.setCenter();
    //this.setLocation();
  }

  componentDidUpdate() {
    // 创建地图
    this.createMap();
    this.setCenter();
  }



  render () { 
    const { className, visible, children, selected, ...others } = this.props;
    
    const cls = classnames({
      'comp-qqmap'          : true,
      [className]        : !!className,
    });
    return (
      <div ref="map" className={cls} {...others} style={{display: (visible ? 'block' : 'none')}}>
      </div>
    );
  }

  createMap() {
    // 获取坐标数据数组
    let lnglats = [];
    React.Children.map(this.props.children, function (child) {
      lnglats.push({
        lng: child.props.lng,
        lat: child.props.lat,
        label: child.props.label
      })
    })
    if (!lnglats.length) {
      return;
    }
    // 计算最大最小经纬度
    let maxLng = lnglats[0].lng,
        minLng=lnglats[0].lng,
        maxLat=lnglats[0].lat,
        minLat=lnglats[0].lat;
    for (let key in lnglats) {
      let res = lnglats[key];
      if(res.lng > maxLng) maxLng =res.lng;  
      if(res.lng < minLng) minLng =res.lng;  
      if(res.lat > maxLat) maxLat =res.lat;  
      if(res.lat < minLat) minLat =res.lat;
    }

    // 计算地图中心点，注意 parseFloat
    let cenLat = (parseFloat(maxLat) + parseFloat(minLat))/2;
    let cenLng = (parseFloat(maxLng) + parseFloat(minLng))/2;
    //通过经纬度计算缩放级别 
    let getZoom = (maxJ, minJ, maxW, minW) => {
      if (maxJ == minJ && maxW == minW) return 13;  
        var diff = maxJ - minJ;  
        if (diff < (maxW - minW) * 2.1) diff = (maxW - minW) * 2.1;  
        diff = parseInt(10000 * diff) / 10000;  
        var zoomArr = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);  
        var diffArr = new Array(180, 90, 45, 22, 11, 5.5, 2.75, 1.37, 0.68, 0.34, 0.17, 0.08, 0.04);  
        for (var i = 0; i < diffArr.length; i++) {  
            if ((diff - diffArr[i]) >= 0) {  
                return zoomArr[i];  
            }  
        }  
        return 14; 
    }
    if (!this.map) {
      this.map = new qq.maps.Map(this.refs.map, {
        zoomControl: false,
        mapTypeId: qq.maps.MapTypeId.ROADMAP,
        center: new qq.maps.LatLng(cenLat, cenLng),
        zoom: getZoom(maxLat, minLat, maxLng, minLng) // 计算缩放级别
      });
    }
    if (localStorage.locateInfo && !this.marker) { 
      //this.marker && this.marker.setMap(null);                                                            
      let locate = JSON.parse(localStorage.locateInfo);

      let anchor = new qq.maps.Point(25, 25),
        size = new qq.maps.Size(50, 50),
        origin = new qq.maps.Point(0, 0),
        icon = new qq.maps.MarkerImage(
            require("../../../images/locate.png"),
            size,
            origin,
            anchor
        );
      /*标注*/
      this.marker = new qq.maps.Marker({
          position: new qq.maps.LatLng(locate.lat, locate.lng),
          draggable: false,/*拖动*/
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

    lnglats.map((item, index) => {
      // /*标注*/
      // new qq.maps.Marker({
      //     position: new qq.maps.LatLng(item.lat, item.lng),
      //     draggable: false,/*拖动*/
      //     map: map
      // });
      /*标注Label*/
      new qq.maps.Label({
          position: new qq.maps.LatLng(item.lat, item.lng),
          map: this.map,
          content: item.label,
          style:{color:"#fff",fontSize:"14px",padding: "0px 0px 0px 2px", border: "2px solid #fff", backgroundColor: (this.props.selected == index ? '#e93a3a' : '#3386ff'), width: "24px", height: "24px", borderRadius: "50%", zIndex: "999" },
          offset:new qq.maps.Size(-15,-25)
      });
    });
    
  }

  // setLocation() {
  //   if () {
  //      /*标注*/
  //     new qq.maps.Marker({
  //         position: this.props.locateInfo,
  //         draggable: false,/*拖动*/
  //         map: this.map
  //     });
  //     this.isSetLocation = true;
  //   }
  // }


  setCenter() {
    React.Children.map(this.props.children, (child, index) => {
      if (index == this.props.selected) {
        this.map.panTo(new qq.maps.LatLng(child.props.lat, child.props.lng));
      }
    })
  }

}




QQMap.propTypes = {
  key      : PropTypes.string,
  className : PropTypes.string,
};

QQMap.defaultProps = {
  className : null,
};

export default QQMap;