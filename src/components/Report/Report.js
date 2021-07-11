// Общий компонент с прогнозом по всем выбранным городам

import React from 'react';
import Box from '@material-ui/core/Box';
import ReportPlace from '@/components/ReportPlace/ReportPlace';

class Report extends React.Component {
  render() {
    return (
      <Box width={1}>
        <ReportPlace />
        <ReportPlace />
      </Box>
    );
  }
}

export default Report;
