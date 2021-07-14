import React from 'react';
import Container from '@material-ui/core/Container';
import { withStyles } from "@material-ui/core/styles";
import haversine from 'haversine-distance'
import Report from '@/components/Report/Report';
import Settings from '@/components/Settings/Settings';
import cityList from '@/city.list.min.json';
import axios from 'axios';

const StyledContainer = withStyles({
  root: {
    paddingLeft: '0px',
    paddingRight: '0px',
    maxWidth: '340px'
  }
})(Container);

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      view: 'settings',
      locations: [],
      reports: []
    }

    this.showSettings = this.showSettings.bind(this);
    this.closeSettings = this.closeSettings.bind(this);
    this.addLocation = this.addLocation.bind(this);
    this.deleteLocation = this.deleteLocation.bind(this);
    this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
  }

  async componentDidMount() {
    // Инициализируем состояние из хранилища
    let persistentState = this.getPersistentState();
    if(persistentState) {
      this.setPersistentState(state => {
        this.updateReports(persistentState.locations);
        return Object.assign(persistentState,
          {
            view: persistentState.locations.length === 0 ? 'settings' : 'report'
          }
        );
      });
    }

    if(!persistentState || persistentState.locations.length === 0) {
      // Если нет сохраненных городов,
      // пробуем подобрать город по координатам
      // Получим координаты пользователя
      let position = await getUserLocation();

      if(position) {
        // Найдем ближайший к пользователю город
        let distanceMin = Number.MAX_VALUE; 
        let location;

        cityList.forEach(c => {
          // Расстояние между точками
          const distance = haversine(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            {
              latitude: c.coord.lat,
              longitude: c.coord.lon
            }
          );

          if(distanceMin > distance) {
            distanceMin = distance;
            location = c;
          }
        });

        // Добавим местоположение пользователя
        if(location && this.state.locations.length === 0) {
          this.setPersistentState(state => {
            let newLocations = state.locations.slice().concat([location]);
            this.updateReports(newLocations);
            
            return { locations: newLocations };
          });
        }
      }
      
      // На случай, если не удалось подобрать город - показываем настройки
      this.setPersistentState(state => ({
        view: state.locations.length === 0 ? 'settings' : 'report'
      }))
    }
  }

  // Получаем состояние из localStorage
  getPersistentState() {
    try {
      const persistentState = JSON.parse(
        localStorage.getItem('weatherWidget'));

      if(persistentState) {
        return persistentState;
      
      } else return null;
    
    } catch(error) {
      console.error(error);
      return null;
    }
  }

  // Устанавляивем состояние и сохраняем его в localStorage
  // setStateFn - Функция, которая работает также, как setState,
  // то есть получает объект state, и возвращает объект, который
  // нужно добавить к состоянию
  setPersistentState(setStateFn) {
    this.setState(state => {
      let persState = this.getPersistentState();
      let newState = setStateFn(state);

      localStorage.setItem('weatherWidget', JSON.stringify(
        Object.assign(persState || {}, newState)));
      
      return newState;
    });
  }

  showSettings() {
    this.setPersistentState(state => {
      return { view: 'settings' };
    });
  }

  closeSettings() {
    this.setPersistentState(state => {
      return { view: 'report' };
    });
  }

  deleteLocation(location) {
    // Удаляем город погоду для него
    this.setPersistentState(state => {
      let index = state.locations.findIndex(l => l.id === location.id);
      let repIndex = state.reports.findIndex(r => r.id === location.id);
      let newLocations = state.locations.slice();
      newLocations.splice(index, 1);

      let newReports = state.reports.slice();
      newReports.splice(repIndex, 1);

      return { locations: newLocations, reports: newReports };
    });
  }

  addLocation(location) {
    // Добавляем город, если найдем в списке городов
    const city = location.split(', ')[0];
    const country = location.split(', ')[1]?.trim();

    const matchLocation = cityList.find(c => {
      if(country && country.length === 2) {
        return c.name.toUpperCase() === city.toUpperCase()
          && c.country === country.toUpperCase();
      
      } else {
        return c.name.toUpperCase() === city.toUpperCase();
      }
    });

    if(matchLocation
        && !this.state.locations.some(l => l.id === matchLocation.id)) {
      // Существует такой город и его ещё нет в списке, добавляем
      let newLocations = this.state.locations.slice().concat([matchLocation]);

      this.setPersistentState(state => {
        newLocations = state.locations.concat([matchLocation]);
        return { locations: newLocations };
      });

      this.updateReports(newLocations);
    }
  }

  // Запрашиваем погоду для выбранных городов, сохраняем ее в состоянии
  async updateReports(locations) {
    if(locations.length === 0) return;

    try {
      let response = await getReports(locations.map(l => l.id));
      this.setPersistentState(state => ({
        reports: response.data.list
      }));

    } catch(error) {
      console.error(error);
    }
  }

  // Обрабатываем окончание drag'n'drop -
  // изменяем порядок выбранных городов
  handleOnDragEnd(result) {
    this.setPersistentState(state => {
      let locations = state.locations.slice();
      let [reorderedLocation] = locations
        .splice(result.source.index, 1);
      locations.splice(result.destination.index,
        0, reorderedLocation);
      
      return { locations };
    });
  }

  render() {
    return (
      <StyledContainer width={1}>
        {this.state.view === 'report'
          ? <Report locations={this.state.locations}
              reports={this.state.reports}
              onGearClick={this.showSettings}/>
          : <Settings locations={this.state.locations}
              onCloseClick={this.closeSettings}
              onLocationAdd={this.addLocation} 
              onDeleteClick={this.deleteLocation}
              onDragEnd={this.handleOnDragEnd} />}
      </StyledContainer>
    );
  }
}

// Заворачиваем в промис получение геолокации пользователя
// Нам, в принципе, не важна обработка ошибок, а важен только объект
// с геолокацией, поэтому будем просто возвращать null в случае
// ошибки, или если метод не поддерживается
function getUserLocation() {
  return new Promise(resolve => {
    if(!navigator.geolocation) {
      resolve(null);
    
    } else navigator.geolocation.getCurrentPosition(resolve, () => null);
  });
}

// Запрос информации о погоде
// id - массив с айдишниками городов
function getReports(id) {
  const appID = 'f05fa10425c30b0d80323eb166a9b626';
  
  return axios({
    method: 'get',
    // group - запрос погоды для списка городов
    url: 'https://api.openweathermap.org/data/2.5/group?lang=en'
      + `&id=${id.join(',')}`
      + `&appid=${appID}`
  });
}

export default App;
