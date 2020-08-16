import { Component, OnInit } from '@angular/core';
import { HomePageService } from '../home-page/home-page.service';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css'],
})
export class FoodDetailComponent implements OnInit {
  constructor(public homePage: HomePageService) {}
  public shopDetails: any;
  reviews: any = [];
  public shopName: string = 'wats the mistake';
  ngOnInit(): void {
    this.shopDetails = this.homePage.shopedetails;
    this.getreviews(this.shopDetails.review[0]);
  }
  getreviews(reviews: any): void {
    this.reviews.push(reviews);
  }
}
