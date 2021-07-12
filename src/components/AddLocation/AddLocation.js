// Добавление города

import React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

class AddLocation extends React.Component {
  render() {
    return (
      <Box width={1} mt={4}>
        <form noValidate autoComplete="off">
          <Box width={1} display="flex" alignItems="center">
            <TextField id="outlined-basic" label="Add Location"
            variant="outlined" size="small" />

            <Box ml={1}>
              <KeyboardReturnIcon className="cursor-pointer" ml={5}/>
            </Box>
          </Box>
        </form>
      </Box>
    );
  }
}

export default AddLocation;
