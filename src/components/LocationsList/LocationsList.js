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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Divider } from '@material-ui/core';

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

class LocationsList extends React.Component {
  constructor(props) {
    super(props);

    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
  }

  onDeleteClick(location) {
    this.props.onDeleteClick(location);
  }

  handleOnDragEnd(result) {
    if(!result.destination) return;
    this.props.onDragEnd(result);
  }

  render() {
    let locations = [];
    this.props.locations.forEach((l, i) => {
      locations.push(
        // Я так понял, чтобы не было ошибки
        // Unable to find draggable with id
        // стоит делать key и draggableId одинаковыми
        <Draggable key={l.id.toString()}
          draggableId={l.id.toString()} index={i}>
          {(provided) => (
            <div ref={provided.innerRef}
              {...provided.draggableProps}>
              <Box width={1} my={2} >
                <PlaceCard variant="outlined">
                  <PlaceCardContent>
                    <Box justifyContent="space-between" display="flex">
                      <Box alignItems="center" display="flex">
                        <span {...provided.dragHandleProps}>
                          <MenuIcon />
                        </span>
                        &nbsp;
                        <Typography variant="caption" component="span" >
                          <b>{`${l.name}, ${l.country}`}</b>
                        </Typography>
                      </Box>

                      <DeleteIcon onClick={this.onDeleteClick.bind(this, l)}
                        className="clickable" />
                    </Box>
                  </PlaceCardContent>
                </PlaceCard>
              </Box>
            </div>
          )}
        </Draggable>
      );
    });

    return (
      <DragDropContext onDragEnd={this.handleOnDragEnd}>
        <Droppable droppableId="places">
          {(provided) => (
            <div {...provided.droppableProps}
              ref={provided.innerRef}>
              {locations}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}

export default LocationsList;
