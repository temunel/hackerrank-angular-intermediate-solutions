import {Component, OnInit, Input} from '@angular/core';
import { HttpClient } from "@angular/common/http";
interface CityWeather {
  name: string;
  weather: string;
  status: string[];
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: CityWeather[];
}
interface data{
  name: String;
  temprature: String;
  wind: String;
  humidity: String;
}
@Component({
  selector: 'weather-finder',
  templateUrl: './weatherFinder.component.html',
  styleUrls: ['./weatherFinder.component.scss']
})
export class WeatherFinder implements OnInit {
  
  @Input() weatherData: data[];
  
  city: any;
  cityDetails = {
    data: [],
    iconSunny: false ,
    iconCold: false,
    weather: null
  };
  
  showNoResult: boolean = false;
  hideDetails: boolean = false;

  constructor (private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    
  }

  cityChange(){
    let value = this.city;

    if(value){
      this.httpClient.get('https://jsonmock.hackerrank.com/api/weather?name=' + value).subscribe((res: any) => {
        this.cityDetails.data = res.data;
        
        if(this.cityDetails.data.length === 0){
          this.showNoResult = true;
          this.hideDetails = false;
        }

        else {
          this.showNoResult = false;
          this.cityDetails.weather = res.data[0].weather;
          let t = res.data[0].weather;
          let m = t.split(' ');

          if(m[0] < 20) {
            this.hideDetails = true;
            this.cityDetails.iconCold = true;
            this.cityDetails.iconSunny = false;
          }
          
          else if(m[0] > 19) {
            this.hideDetails = true;
            this.cityDetails.iconSunny = true;
            this.cityDetails.iconCold = false;
          }
        }
      })
    }
  }
}
