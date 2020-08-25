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
    public searchLocation: SearchLocationService,
    private homepageService: HomePageService
  ) {}

  allshops: any = [];
  ngOnInit(): void {
    if (this.searchLocation.locationname.length > 0) {
      this.homepageService
        .GetLocationDetails(this.searchLocation.locationname)
        .subscribe((areaDetails) => {
          this.getallshopdetails(areaDetails);
        });
    }
  }

  getallshopdetails(areaDetails: any): any {
    areaDetails.areas[0].categoryList.forEach((categoryist) => {
      categoryist.shop.forEach((shops) => {
        this.allshops.push(shops.shopDetails);
      });
    });
  }

  navigate(shopdetails: any): void {
    this.homepageService.shopedetails = shopdetails;
    this.router.navigate(['food-detail']);
  }

  navigatepostfooditem(): void {
    this.router.navigate(['post-food-item']);
  }
}
