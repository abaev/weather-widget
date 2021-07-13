// Заголовок с городом и кнопкой gear

import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';

class ReportHeader extends React.Component {
  constructor(props) {
    super(props);

    this.onGearClick = this.onGearClick.bind(this);
  }

  onGearClick() {
    this.props.onGearClick();
  }

  render() {
    return (
      <Box width={1} display="flex"
        justifyContent="space-between"
        alignItems="center">
        <Typography variant="subtitle2" component="span">
          <b>{this.props.header}</b>
        </Typography>

        {this.props.showGear
          && <SettingsIcon className="clickable"
          onClick={this.onGearClick}/>}
      </Box>
    );
  }
}

export default ReportHeader;
