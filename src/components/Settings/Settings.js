// Общий компонент Настройки

import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import PlacesList from '@/components/PlacesList/PlacesList';
import AddLocation from '@/components/AddLocation/AddLocation';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.closeSettings = this.closeSettings.bind(this);
  }

  closeSettings() {
    this.props.closeSettings();
  }

  render() {
    return (
      <Box width={1}>
        <Box width={1} display="flex"
          justifyContent="space-between"
          alignItems="center">
          <Typography variant="subtitle2" component="span" >
            <b>Settings</b>
          </Typography>
          <CloseIcon className="cursor-pointer" 
            onClick={this.closeSettings} />
        </Box>

        <PlacesList />
        <PlacesList />

        <AddLocation />
      </Box>
    );
  }
}

export default Settings;
