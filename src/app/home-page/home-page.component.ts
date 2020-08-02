import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchLocationService } from '../search-location/search-location.service';
import { HomePageService } from './home-page.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private router: Router,
    private searchLocation: SearchLocationService,
    private homepageService: HomePageService
  ) {}

  areaDetails: any = null;
  ngOnInit(): void {
    if (this.searchLocation.locationname.length > 0) {
      this.homepageService
        .GetLocationDetails(this.searchLocation.locationname)
        .subscribe((areaDetails) => {
          this.areaDetails = areaDetails;
        });
    }
  }

  navigate(): void {
    this.router.navigate(['food-detail']);
  }
}
