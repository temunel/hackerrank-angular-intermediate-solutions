import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";

interface Competition {
  name: string;
  country: string;
  year: number;
  winner: string;
  runnerup: string;
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Competition[];
}

@Component({
  selector: 'football-competitions',
  templateUrl: './footballCompetitions.component.html',
  styleUrls: ['./footballCompetitions.component.scss']
})
export class FootballCompetitions implements OnInit {

  football!: ApiResponse;
  data: Competition[] = [];
  total_pages: Array<number> = [];


  constructor(private httpClient: HttpClient) {

  }


  ngOnInit() {
    this.fetchFootball(1).subscribe({
      next: (response: ApiResponse) => {
        this.football = response;
        this.data = this.football.data;
        this.total_pages = Array(this.football.total_pages).fill(0);
      }
    });
  }


  fetchFootball(page: number) {
    return this.httpClient.get(`https://jsonmock.hackerrank.com/api/football_competitions?page=${page}`);
  }


  click(page: number) {
    this.fetchFootball(page).subscribe({
      next: (response: ApiResponse) => {
        this.football = response;
        this.data = this.football.data;
        this.total_pages = Array(this.football.total_pages).fill(0);
      }
    });
  }
}
