// Список городов

import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import MenuIcon from '@material-ui/icons/Menu';
import DeleteIcon from '@material-ui/icons/Delete';

const PlaceCardContent = withStyles({
  root: {
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '5px',
    paddingBottom: '5px',
    '&:last-child': {
      paddingBottom: '5px',
    }
  }
})(CardContent);

const PlaceCard = withStyles({
  root: {
    borderColor: 'transparent',
    backgroundColor: grey[200]
  }
})(Card);

class PlacesList extends React.Component {
  render() {
    return (
      <Box width={1} my={2}>
        <PlaceCard variant="outlined">
          <PlaceCardContent>
            <Box justifyContent="space-between" display="flex">
              <Box alignItems="center" display="flex">
                <MenuIcon className="cursor-pointer" />
                &nbsp;
                <Typography variant="caption" component="span" >
                  <b>London, UK</b>
                </Typography>
              </Box>

              <DeleteIcon className="cursor-pointer" />
            </Box>
          </PlaceCardContent>
        </PlaceCard>
      </Box>
    );
  }
}

export default PlacesList;
