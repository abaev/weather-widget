// Компонент с прогнозом по конкретному городу

import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import NavigationIcon from '@material-ui/icons/Navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
import ReportHeader from '@/components/ReportHeader/ReportHeader';

class LocationReport extends React.Component {
  constructor(props) {
    super(props);

    this.onGearClick = this.onGearClick.bind(this);
  }

  onGearClick() {
    this.props.onGearClick();
  }

  render() {
    const reportHeader = `${this.props.location.name}, ${this.props.location.country}`;

    return (
      <Box width={1} mb={3}>
        <ReportHeader header={reportHeader} showGear={this.props.showGear}
          onGearClick={this.onGearClick}/>
        
        {/* Иконка с погодными условиями и температура */}
        <Box width={1} display="flex" 
          justifyContent="center"
          alignItems="center" mt={2}>
          <img className="report-conditions-image" src="http://openweathermap.org/img/wn/10d@2x.png" />
          <Typography variant="h4" component="span" >
            7&deg; C
          </Typography>
        </Box>

        {/* Ощается как, погодные условия в общем */}
        <Box width={1} mt={2} mb={1}>
          <Typography variant="caption">
            Feels like -3&deg; C. Broken clouds. Light breeze
          </Typography>
        </Box>

        <Box width={1} display="flex" 
          justifyContent="space-between"
          alignItems="center"
          mb={1}>

          {/* Ветер */}
          <Box alignItems="center" display="inline-flex">
            <NavigationIcon fontSize="inherit" />
            &nbsp;
            <Typography variant="caption" component="span">
              3.0 m/s SSE
            </Typography>
          </Box>

          {/* Давление */}
          <Box alignItems="center" display="inline-flex">
            <FontAwesomeIcon icon={faTachometerAlt} />
            &nbsp;
            <Typography variant="caption">
              1021hPa
            </Typography>
          </Box>
        </Box>

        {/* Влажность и точка росы */}
        <Box width={1} display="flex" 
          justifyContent="space-between"
          alignItems="center"
          mb={1}>
          <Box alignItems="center" display="inline-flex">
            <Typography variant="caption">
              Humidity: 97%
            </Typography>
          </Box>

          <Box alignItems="center" display="inline-flex">
            <Typography variant="caption">
              Dew point: 0&deg; C
            </Typography>
          </Box>
        </Box>

        {/* Видимость */}
        <Box width={1}>
          <Typography variant="caption">
            Visibility: 10.0 km
          </Typography>
        </Box>
      </Box>
    );
  }
}

export default LocationReport;
