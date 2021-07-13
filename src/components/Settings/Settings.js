// Общий компонент Настройки

import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import LocationsList from '@/components/LocationsList/LocationsList';
import AddLocation from '@/components/AddLocation/AddLocation';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.onCloseClick = this.onCloseClick.bind(this);
    this.onLocationAdd = this.onLocationAdd.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onCloseClick() {
    this.props.onCloseClick();
  }

  onLocationAdd(location) {
    this.props.onLocationAdd(location);
  }

  onDeleteClick(location) {
    this.props.onDeleteClick(location);
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
          {this.props.locations.length > 0
            && <CloseIcon className="clickable" 
                onClick={this.onCloseClick} />
          }
          
        </Box>

        <LocationsList locations={this.props.locations}
          onDeleteClick={this.onDeleteClick} />

        <AddLocation onLocationAdd={this.onLocationAdd}/>
      </Box>
    );
  }
}

export default Settings;
