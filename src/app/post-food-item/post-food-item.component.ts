import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { PostFoodItemService } from './post-food-item.service';
import { Observable } from 'rxjs';

import { startWith, map } from 'rxjs/operators';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-food-item',
  templateUrl: './post-food-item.component.html',
  styleUrls: ['./post-food-item.component.css'],
})
export class PostFoodItemComponent implements OnInit {
  constructor(
    private el: ElementRef,
    private router: Router,
    private postfooditem: PostFoodItemService
  ) {}

  //declaration
  filteredStreets: Observable<string[]>;
  control = new FormControl();
  public options: string[] = ['Select Category'];
  selectedCategory = 'Select Category';
  buttonlocation: string = 'get location';

  ngOnInit(): void {
    this.postfooditem.GetLocationDetails('empty').subscribe((areadetails) => {
      this.categoryList(areadetails);
    });
  }

  public categoryList(areaDetails: any): void {
    areaDetails.areas[0].categoryList.forEach((categoryist) => {
      this.options.push(categoryist.categoryName);
    });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      //x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  showPosition(position): void {
    const LatLong = position.coords.latitude + ',' + position.coords.longitude;
    this.buttonlocation = 'Location received';
  }

  //navigation
  navigate(): void {
    this.router.navigate(['search-location']);
  }
  navigatesignup(): void {
    let signupcontainer = this.el.nativeElement.querySelector('.container');
    signupcontainer.classList.add('sign-up-mode');
  }
  navigatesignin(): void {
    let signincontainer = this.el.nativeElement.querySelector('.container');
    signincontainer.classList.remove('sign-up-mode');
  }
  files: File[] = [];

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
