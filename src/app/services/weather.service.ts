import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherMapApiKey = '44c089b00d79fdad4dc74d12b8a3d9e7';

  constructor(private _http: HttpClient) { }

  

  getWeatherByLatAndLong(lat, lon) {
    return this._http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.weatherMapApiKey}&units=metric`)
  }


  getCurrentWeather (city:string) {
    return this._http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.weatherMapApiKey}&units=metric`)
  }

 

  getForecast(city:string){
    return this._http.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.weatherMapApiKey}&units=metric`)
  }

  getForecastByCoordiantes(lat, lon){
    return this._http.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.weatherMapApiKey}&units=metric`);
  }


}
