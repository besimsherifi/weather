import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isSubmitting = false;
  cityName = '';
  currentLocationData;
  currentLocationForecast: string[] = [];
  searchedLocationData;
  searchedLocationForecast:string[] = [];
  latitude: number;
  longitude: number;

  constructor(private weatherService: WeatherService) { }

   async ngOnInit() {
    await this.getLocation();
    this.getWeatherByCoordinates();
  }



  getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          if (position) {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            })
          }
        },
          (error) => reject(error));
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    });
  }

  

  onSubmit(form: NgForm) {
    this.cityName = form.value.city;
    combineLatest(
      this.weatherService.getCurrentWeather(this.cityName),
      this.weatherService.getForecast(this.cityName)
    )
    .subscribe(([getCurrentWeatherRes,getForecastRes]:any)=>{
      this.searchedLocationForecast=[];
      for (let i = 0; i < getForecastRes.list.length; i += 8) {
        this.searchedLocationForecast.push(getForecastRes.list[i]);
        }
      this.searchedLocationData = getCurrentWeatherRes;
    });    
  }


  getWeatherByCoordinates() {
    this.weatherService.getWeatherByLatAndLong(this.latitude, this.longitude).subscribe((res) => {
      this.currentLocationData = res;
    });
      this.weatherService.getForecastByCoordiantes(this.latitude, this.longitude).subscribe((res: any) => {
        for (let i = 0; i < res.list.length; i += 8) {
          this.currentLocationForecast.push(res.list[i]);
        }
      });
    }





}
