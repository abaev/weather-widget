import React from 'react';
import Container from '@material-ui/core/Container';
import { withStyles } from "@material-ui/core/styles";
import Report from '@/components/Report/Report';
import Settings from '@/components/Settings/Settings';

const StyledContainer = withStyles({
  root: {
    paddingLeft: '0px',
    paddingRight: '0px',
    maxWidth: '300px'
  }
})(Container);

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      view: 'report'
    }

    this.showSettings = this.showSettings.bind(this);
    this.closeSettings = this.closeSettings.bind(this);
  }

  showSettings() {
    this.setState({ view: 'settings' });
  }

  closeSettings() {
    this.setState({ view: 'report' });
  }

  render() {
    return (
      <StyledContainer width={1}>
        {this.state.view === 'report'
          ? <Report onGearClick={this.showSettings}/>
          : <Settings closeSettings={this.closeSettings}/>}
        
        
      </StyledContainer>
    );
  }
}

export default App;
