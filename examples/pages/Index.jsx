
import React, { Component } from 'react';
import Map from '../../components';

class Index extends Component {



  render() {
    let latLnts = [
      {
        lat:"31.241402867905614",
        lng:"121.4529219996628",
        label: '协进大楼1'
      },
      {
        lat:"31.23630944041476",
        lng:"121.49141501957922",
        label: '协进大楼2'
      }
    ];
    return (
      <div className="index-page">
        <Map visible={true} height="300" selected={1}>
          {
            latLnts.map((latLnt, idx) => {
              return <Map.Marker key={idx} {...latLnt}></Map.Marker>
            })
          }
        </Map>
      </div>
    );
  }
}

export default Index;