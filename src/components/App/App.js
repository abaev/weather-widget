import React from 'react';
import Container from '@material-ui/core/Container';
import { withStyles } from "@material-ui/core/styles";
import haversine from 'haversine-distance'
import Report from '@/components/Report/Report';
import Settings from '@/components/Settings/Settings';
import cityList from '@/city.list.min.json';

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
      locations: []
    }

    this.showSettings = this.showSettings.bind(this);
    this.closeSettings = this.closeSettings.bind(this);
    this.addLocation = this.addLocation.bind(this);
    this.deleteLocation = this.deleteLocation.bind(this);
  }

  async componentDidMount() {
    // Инициализируем состояние из хранилища
    let persistentState = this.getPersistentState();
    if(persistentState) {
      this.setPersistentState(state => persistentState);
    }

    if(this.state.locations.length === 0) {
      // Если нет сохраненных городов, пробуем подобрать город по координатам
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
          this.setPersistentState(state => ({
            locations: state.locations.concat([location])
          }))
        }
      }
      
      // На случай, если не удалось подобрать город показываем настройки
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
      let mewState = setStateFn(state);

      localStorage.setItem('weatherWidget', JSON.stringify(
        Object.assign(persState || {}, mewState)));
      
      return mewState;
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
    // Удаляем город
    this.setPersistentState(state => {
      let index = state.locations.findIndex(l => l.id === location.id);
      let newLocations = state.locations.slice();
      newLocations.splice(index, 1);

      return { locations: newLocations };
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

      this.setPersistentState(state => {
        return { locations: state.locations.concat([matchLocation]) };
      });
    }
  }

  render() {
    return (
      <StyledContainer width={1}>
        {this.state.view === 'report'
          ? <Report locations={this.state.locations}
              onGearClick={this.showSettings}/>
          : <Settings locations={this.state.locations}
              onCloseClick={this.closeSettings}
              onLocationAdd={this.addLocation} 
              onDeleteClick={this.deleteLocation} />}
      </StyledContainer>
    );
  }
}

// Заворачиваем в промис получение геолокации пользователя
// Нам в принципе, не важна обработка ошибок, а важен только объект
// с геолокацией, поэтому будем просто возвращать null в случае
// ошибки, или если метод не поддерживается
const getUserLocation = function() {
  return new Promise(resolve => {
    if(!navigator.geolocation) {
      resolve(null);
    
    } else navigator.geolocation.getCurrentPosition(resolve, () => null);
  });
}

export default App;
