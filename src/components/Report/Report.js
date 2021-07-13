// Общий компонент с погодой по всем выбранным городам

import React from 'react';
import Box from '@material-ui/core/Box';
import LocationReport from '@/components/LocationReport/LocationReport';

class Report extends React.Component {
  constructor(props) {
    super(props);

    this.onGearClick = this.onGearClick.bind(this);
  }

  onGearClick() {
    this.props.onGearClick();
  }

  render() {
    let reports = [];
    this.props.locations.forEach((l, i) => {
      reports.push(
        <LocationReport location={this.props.locations[i]}
          report={this.props.reports
            .find(r => r.id === this.props.locations[i].id)}
          showGear={i === 0}
          onGearClick={this.onGearClick}
          key={i} />
      );
    });

    return (
      <Box width={1}>
        {reports}
      </Box>
    );
  }
}

export default Report;
