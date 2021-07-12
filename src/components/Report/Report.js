// Общий компонент с прогнозом по всем выбранным городам

import React from 'react';
import Box from '@material-ui/core/Box';
import ReportPlace from '@/components/ReportPlace/ReportPlace';

class Report extends React.Component {
  constructor(props) {
    super(props);

    this.onGearClick = this.onGearClick.bind(this);
  }

  onGearClick() {
    this.props.onGearClick();
  }

  render() {
    return (
      <Box width={1}>
        <ReportPlace showGear={true}
          onGearClick={this.onGearClick}/>
        <ReportPlace />
      </Box>
    );
  }
}

export default Report;
