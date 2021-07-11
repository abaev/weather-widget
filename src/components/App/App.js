import React from 'react';
import Container from '@material-ui/core/Container';
import { withStyles } from "@material-ui/core/styles";
import Report from '@/components/Report/Report';

const StyledContainer = withStyles({
  root: {
    paddingLeft: '0px',
    paddingRight: '0px'
  }
})(Container);

class App extends React.Component {
  render() {
    return (
      <StyledContainer width={1}>
        <Report />
      </StyledContainer>
    );
  }
}

export default App;
