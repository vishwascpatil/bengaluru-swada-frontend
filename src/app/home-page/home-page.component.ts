import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchLocationService } from '../search-location/search-location.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private router: Router,
    private searchLocation: SearchLocationService
  ) {}

  ngOnInit(): void {
    this.searchLocation.locationname;
  }

  navigate(): void {
    this.router.navigate(['food-detail']);
  }
}
