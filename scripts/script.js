const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
}

function getWeekDay(cityName, temp, now) {
  const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
  const dayOfWeek = days[now.getDay()]
  const hour = now.getHours()
  const minute = now.getMinutes()
  const time = `${hour} : ${minute}`
  innerHtml(cityName, temp, dayOfWeek, time)
}

const success = (pos) => {
  const crd = pos.coords
  const lat = crd.latitude
  const lon = crd.longitude
  const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f43b867f5c45ec9d96c49cb2ef64b80a`
  fetch(weatherApi, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {
      const cityName = data.name
      const tem = data.main.temp
      const temp = Math.floor(tem - 275.15)
      let now = new Date()
      getWeekDay(cityName, temp, now)
    })
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`)
}

const innerHtml = (cityName, temp, dayOfWeek, time) => {
  const wrapper = document.querySelector('.wrapper')
  const application = `
      <div class="application">
      <div class="weather-card">
        <div class="weather-card__item">
          <div class="item__icon">
            <img src="../img/sun1.png" alt="iconsun" />
          </div>
        </div>
        <div class="weather-card__item">
          <div class="item__degrees">
            <span class="degrees">${temp}&deg</span>
          </div>
        </div>
        <div class="weather-card__item">
          <div class="item__geo">
            <span class="geo__city">${cityName}</span>
            <span class="geo__dayofweek">${dayOfWeek}</span>
            <span class="geo__dayofweek">${time}</span>
          </div>
        </div>
      </div>
      </div>
`
  wrapper.innerHTML += application
}
document.addEventListener('DOMContentLoaded', navigator.geolocation.getCurrentPosition(success, error, options))
