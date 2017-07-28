import React from 'react';

class CustomTooltip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      const { active } = this.props;

    if (active) {
      const { payload, label } = this.props;
      return (
        <div className="heatmap-tooltip">
          <p className="label">{`${Number(payload[0].value).toLocaleString('en')}`}</p>
        </div>
      );
    }

    return null;
  }

}
export default CustomTooltip;
