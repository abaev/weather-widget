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
    const report = this.props.report || {};
    const weather = report.weather || {};
    const conditionsImage = 'http://openweathermap.org/img/wn/'
      + `${weather[0]?.icon}@2x.png`;
    
    const temperature = Math.round(report.main?.temp - 273.15) || '';
    const feelsLike = Math.round(report.main?.feels_like - 273.15) || '';
    
    let description = weather[0]?.description || '';
    description = description.charAt(0).toUpperCase() + description.slice(1);

    let windSpeed;
    let windDirection = '';
    let windIconStyle;
    if(report.wind && (report.wind.speed || report.wind.speed === 0)
      && report.wind.deg) {
      // Скорость и направление ветра
      windSpeed = Math.round(report.wind.speed * 10) / 10;

      if(windSpeed !== 0) {
        if(report.wind.deg >= 348.75 && report.wind.deg <= 11.25) {
          windDirection = 'N';
        }

        if(report.wind.deg > 11.25 && report.wind.deg <= 33.75) {
          windDirection = 'NNE';
        }

        if(report.wind.deg > 33.75 && report.wind.deg <= 56.25) {
          windDirection = 'NE';
        }

        if(report.wind.deg > 56.25 && report.wind.deg <= 78.75) {
          windDirection = 'ENE';
        }

        if(report.wind.deg > 78.75 && report.wind.deg <= 101.25) {
          windDirection = 'E';
        }

        if(report.wind.deg > 101.25 && report.wind.deg <= 123.75) {
          windDirection = 'ESE';
        }

        if(report.wind.deg > 123.7 && report.wind.deg <= 146.255) {
          windDirection = 'SE';
        }

        if(report.wind.deg > 146.255 && report.wind.deg <= 168.75) {
          windDirection = 'SSE';
        }

        if(report.wind.deg > 168.75 && report.wind.deg <= 191.255) {
          windDirection = 'S';
        }

        if(report.wind.deg > 191.255 && report.wind.deg <= 213.75) {
          windDirection = 'SSW';
        }

        if(report.wind.deg > 213.75 && report.wind.deg <= 236.25) {
          windDirection = 'SW';
        }

        if(report.wind.deg > 236.25 && report.wind.deg <= 258.75) {
          windDirection = 'WSW';
        }

        if(report.wind.deg > 258.75 && report.wind.deg <= 281.25) {
          windDirection = 'W';
        }

        if(report.wind.deg > 281.25 && report.wind.deg <= 303.75) {
          windDirection = 'WNW';
        }

        if(report.wind.deg > 303.75 && report.wind.deg <= 326.25) {
          windDirection = 'NW';
        }

        if(report.wind.deg > 326.25 && report.wind.deg < 348.75) {
          windDirection = 'NNW';
        }

        windIconStyle = {
          transform: `rotate(${report.wind.deg}deg)`
        };
      }
    }

    const pressure = report.main?.pressure || '';
    const humidity = report.main?.humidity || '';
    const visibility = report?.visibility / 1000 || '';


    return (
      <Box width={1} mb={3}>
        <ReportHeader header={reportHeader} showGear={this.props.showGear}
          onGearClick={this.onGearClick}/>
        
        {/* Иконка с погодными условиями и температура */}
        <Box width={1} display="flex" 
          justifyContent="center"
          alignItems="center" mt={2}>
          <img className="report-conditions-image" src={conditionsImage} />

          {temperature
            && 
            <Typography variant="h4" component="span" >
              {temperature}&deg; C
            </Typography>
          }
          
        </Box>

        {/* Ощается как, погодные условия в общем */}
        <Box width={1} mt={2} mb={1}>
          <Typography variant="caption">
            {feelsLike
              && 'Feels like ' + feelsLike} 
            {feelsLike
              && <span>&deg; C </span>}
            {description}
          </Typography>
        </Box>

        <Box width={1} display="flex" 
          justifyContent="space-between"
          alignItems="center"
          mb={1}>

          {/* Ветер */}
          {(windSpeed || windSpeed === 0)
            && 
            <Box alignItems="center" display="inline-flex">
              <NavigationIcon fontSize="inherit"
              style={windIconStyle} />
              &nbsp;
              <Typography variant="caption" component="span">
                {windSpeed} m/s {windDirection}
              </Typography>
            </Box>
          }

          {/* Давление */}
          {pressure
            &&
            <Box alignItems="center" display="inline-flex">
              <FontAwesomeIcon icon={faTachometerAlt} />
              &nbsp;
              <Typography variant="caption">
                {pressure}hPa
              </Typography>
            </Box>
          }
        </Box>

        {/* Влажность и точка росы */}
        <Box width={1} display="flex" 
          justifyContent="space-between"
          alignItems="center"
          mb={1}>
          {humidity
            &&
            <Box alignItems="center" display="inline-flex">
              <Typography variant="caption">
                Humidity: {humidity}%
              </Typography>
            </Box>
          }
          
          {/* Openweather не отдает информацию по точке росы */}
          {/* <Box alignItems="center" display="inline-flex">
            <Typography variant="caption">
              Dew point: 0&deg; C
            </Typography>
          </Box> */}

          {/* Видимость */}
          {visibility
            &&
            <Box>
              <Typography variant="caption">
                Visibility: {visibility} km
              </Typography>
            </Box>
          }
          
        </Box>
      </Box>
    );
  }
}

export default LocationReport;
