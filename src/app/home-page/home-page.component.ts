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

  disableprofile: boolean = true;
  foodPosts: any = [];
  ngOnInit(): void {
    this.homepageService
      .GetFoodPosts(this.searchLocation.locationname)
      .subscribe((foodposts) => {
        foodposts.forEach((foodpost) => {
          this.foodPosts.push(foodpost);
        });
      });
  }

  navigatepostfooditem(): void {
    this.router.navigate(['post-food-item']);
  }
}
