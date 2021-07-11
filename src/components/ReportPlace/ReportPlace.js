// Компонент с прогнозом по конкретному городу

import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import NavigationIcon from '@material-ui/icons/Navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
import ReportHeader from '@/components/ReportHeader/ReportHeader';


class ReportPlace extends React.Component {
  render() {
    return (
      <Box width={1} mb={3}>
        <ReportHeader />
        
        {/* Иконка с погодными условиями и температура */}
        <Box width={1} display="flex" 
          justifyContent="center"
          alignItems="center">
          <img src="http://openweathermap.org/img/wn/10d@2x.png" />
          <Typography variant="h4" component="span" >
            7&deg; C
          </Typography>
        </Box>

        <Box width={1} mb={1}>
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

export default ReportPlace;
