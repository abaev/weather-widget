// Добавление города

import React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

class AddLocation extends React.Component {
  constructor(props) {
    super(props);
    this.locationInput = React.createRef();

    this.onLocationAdd = this.onLocationAdd.bind(this);
  }

  onLocationAdd(event) {
    event.preventDefault();
    
    // Если ввели не пустую строку, передаем ввод выше
    let location = this.locationInput.current.value?.trim();
    if(location) {
      this.props.onLocationAdd(location);
      this.locationInput.current.value = '';
    }
  }

  render() {
    return (
      <Box width={1} mt={4}>
        <form noValidate autoComplete="off" onSubmit={this.onLocationAdd}>
          <Box width={1} display="flex" alignItems="center">
            <TextField inputRef={this.locationInput}
              label="Add Location"
              variant="outlined" size="small"
              placeholder="London, UK"/>

            <Box ml={1}>
              <KeyboardReturnIcon className="clickable" ml={5}
                onClick={this.onLocationAdd}/>
            </Box>
          </Box>
        </form>
      </Box>
    );
  }
}

export default AddLocation;
