import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { SearchLocationService } from '../search-location/search-location.service';
import { HomePageService } from './home-page.service';

import { NgxHmCarouselModule } from 'ngx-hm-carousel';

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

  enableProfile: boolean = false;
  enableSearch: boolean = false;
  enableHomeScreen: boolean = true;
  foodPosts: any = [];
  locationslist: any = [];
  ngOnInit(): void {
    this.homepageService.GetFoodPosts('loadall').subscribe((foodposts) => {
      foodposts.forEach((foodpost) => {
        this.foodPosts.push(foodpost);
      });
    });
    this.homepageService.GetLocations().subscribe((foodposts) => {
      foodposts.forEach((locationsList) => {
        this.locationslist.push(locationsList);
      });
    });
  }

  navigatepostfooditem(): void {
    this.router.navigate(['post-food-item']);
  }

  Search(): void {
    this.enableHomeScreen = false;
    this.enableProfile = false;
    this.enableSearch = true;
  }
  home(): void {
    this.enableSearch = false;
    this.enableProfile = false;
    this.enableHomeScreen = true;
  }
  enableprofile(): void {
    this.enableSearch = false;
    this.enableHomeScreen = false;
    this.enableProfile = true;
  }
  enablesavefoodposts(): void {
    this.enableSearch = false;
    this.enableHomeScreen = false;
    this.enableProfile = false;
  }
  public model: any;
  formatter = (result: string) => result.toUpperCase();

  public search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term === ''
          ? []
          : this.locationslist
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );
  changelocation(model: any) {
    this.locationslist.forEach((element) => {
      if (element == model) {
        this.homepageService.GetFoodPosts(model).subscribe((foodposts) => {
          this.foodPosts = foodposts;
          this.home();
        });
        return;
      }
    });
  }
  index = 0;
  infinite = true;
  autoplay = false;
  avatars = '12345'.split('').map((x, i) => {
    const num = i;
    // const num = Math.floor(Math.random() * 1000);
    return {
      url: `https://picsum.photos/600/400/?${num}`,
      title: `${num}`
    };
  });


}
