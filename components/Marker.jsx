
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Marker extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render () { 
    const { className, visible,  ...others } = this.props;

    const cls = classnames({
      'ui-qqmap'          : true,
      [className]        : !!className,
    });

    return (
      <div className={cls} {...others} style={{display: (visible ? 'block' : 'none')}}>
      </div>
    );
  }

}

Marker.propTypes = {
  type      : PropTypes.string,
  className : PropTypes.string,
};

Marker.defaultProps = {
  className : null,
};

export default Marker;