import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { PostFoodItemService } from './post-food-item.service';
import { PostFoodDetails } from './postFoodDetails';

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
  postfoodetails: PostFoodDetails = {
    ImageUrls: [],
    CategoryId: 0,
  } as PostFoodDetails;

  categorydetails: any = [
    {
      categoryId: 0,
      categoryName: 'Select category',
    },
  ];
  files: File[] = [];

  //initialization
  ngOnInit(): void {
    this.postfooditem
      .GetCategoryListDetails()
      .subscribe((categorydetailslist) => {
        categorydetailslist.forEach((categorydetail) => {
          this.categorydetails.push(categorydetail);
        });
      });
  }

  //binds categoryid into the postcategoryid object on change method
  public bindcategoryid(categoryId: number): void {
    this.postfoodetails.CategoryId = categoryId;
  }

  //get latitude longitude values
  public getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log('failed to locate the position');
    }
  }
  public showPosition(position): void {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    localStorage.setItem('latitude', latitude);
    localStorage.setItem('longitude', longitude);
  }

  //Select files
  onSelect(event) {
    this.files.push(...event.addedFiles);
    this.uploadFiles(this.files);
  }
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  public uploadFiles = (files) => {
    if (files.length === 0) {
      return;
    }
    let filesToUpload: File[] = files;
    filesToUpload.forEach((filetoupload) => {
      const reader = new FileReader();
      reader.readAsDataURL(filetoupload);
      reader.onload = (e: any) => {
        this.postfoodetails.ImageUrls.push(e.target.result);
      };
    });
  };

  public uploadfooddetails() {
    this.postfoodetails.Latitude = localStorage.getItem('latitude');
    this.postfoodetails.Longitude = localStorage.getItem('longitude');

    if(this.postfoodetails.Latitude && this.postfoodetails.Longitude)
    {
      if(this.postfoodetails.ImageUrls[0]){
    this.router.navigate(['home-page']);
    this.postfooditem
      .saveshopdetails(this.postfoodetails)
      .subscribe((stringvalue) => {
        console.log(stringvalue);
      });
    localStorage.clear();
  }
  else
  alert("Please upload food pictures");
    }
    else
        alert("Please Click on Get Location for accurate position of the shop");

  }


}
