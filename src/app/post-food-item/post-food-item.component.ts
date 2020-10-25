import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
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

  disableloader: boolean =  true;
  successflag: boolean = false;
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

  public validateFoodProductDetails():boolean
  {
    if(!this.postfoodetails.Latitude && !this.postfoodetails.Longitude)
    {
        alert("Please Click on Get Location for accurate position of the shop");
        return false;
    }

    if(!this.postfoodetails.ImageUrls[0])
    {
        alert("please upload food pictures");
        return false;
    }
    if(!this.postfoodetails.FamousFood){
      alert("please Enter Famous Food Name");
      return false;
    }
    if(!this.postfoodetails.Price){
      alert("please Enter Food Price");
      return false;
    }
    if(!this.postfoodetails.CategoryId){
      alert("please Select the Food Category");
      return false;
    }
    if(!this.postfoodetails.ShopName){
      alert("please Enter the Shop Name");
      return false;
    }
    if(!this.postfoodetails.FoodDescription){
      alert("please Enter the Food Description");
      return false;
    }
    if(!this.postfoodetails.LocationName){
      alert("please Enter the Location Name");
      return false;
    }
    return true;
  }
  public async uploadfooddetails() {
    this.postfoodetails.Latitude = localStorage.getItem('latitude');
    this.postfoodetails.Longitude = localStorage.getItem('longitude');

    this.disableloader = false;

    if(this.validateFoodProductDetails())
    {
      this.disableloader = false;
    if(await this.postfooditem
      .saveshopdetails(this.postfoodetails))
      {
        this.successflag = true;
        setTimeout(()=>{
          this.router.navigate(['home-page']) }, 2000)

      }
    localStorage.clear();
    }
  }


}


