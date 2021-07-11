// Заголовок с городом и кнопкой gear

import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import { withStyles } from "@material-ui/core/styles";

const StyledSettingsIcon = withStyles({
  root: {
    cursor: 'pointer'
  }
})(SettingsIcon);

class ReportHeader extends React.Component {
  render() {
    return (
      <Box width={1} gutterBottom display="flex"
        justifyContent="space-between"
        alignItems="center">
        <Typography variant="subtitle2" component="span" >
          <b>London, UK</b>
        </Typography>

        <StyledSettingsIcon fontSize="2rem" />
      </Box>
    );
  }
}

export default ReportHeader;
