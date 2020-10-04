import {
  Component,
  OnInit,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { PostFoodItemService } from './post-food-item.service';
import { Observable } from 'rxjs';

import { startWith, map } from 'rxjs/operators';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-post-food-item',
  templateUrl: './post-food-item.component.html',
  styleUrls: ['./post-food-item.component.css'],
})
export class PostFoodItemComponent implements OnInit {
  constructor(
    private el: ElementRef,
    private router: Router,
    private postfooditem: PostFoodItemService,
    private http: HttpClient
  ) {}

  //declaration
  filteredStreets: Observable<string[]>;
  control = new FormControl();
  public options: string[] = ['Select Category'];
  public categorydetails: any = [];
  selectedCategory = 'Select Category';
  buttonlocation: string = 'get location';
  formData = new FormData();
  files: File[] = [];
  famousFoodName: string = '';
  price: string = '';
  shopName: string = '';
  description: string = '';
  areaName: string = '';
  ngOnInit(): void {
    this.postfooditem.GetLocationDetails().subscribe((categorydetailslist) => {
      this.categoryList(categorydetailslist);
    });
  }

  public categoryList(categorydetailslist: any): void {
    categorydetailslist.forEach((categoryist) => {
      this.options.push(categoryist.categoryName);
      this.categorydetails.push(categoryist);
    });
  }

  public getLocation() {
    if (navigator.geolocation) {
      let hey = navigator.geolocation.getCurrentPosition(this.showPosition);
      let sdfhey = 0;
    } else {
      //x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  public showPosition(position): void {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    localStorage.setItem('latitude', latitude);
    localStorage.setItem('longitude', longitude);
    //this.buttonlocation = 'Location received';
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

  //on change method for upload files
  onSelect(event) {
    this.files.push(...event.addedFiles);
    this.uploadFiles(this.files);
  }

  //remove files from dropzone
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  //declaration for file uploads
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();

  //save file details under formdata

  cardImageBase64: string =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAAAaCAYAAABy3SSpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASZSURBVHgB7Vr/cds8DH357vu/2qDcoN6g7AR1JzA7QdIJrE5gb+B0gqQTyJ0g7QR2J0g3SIVIPDMyAP6Q4rukfne4JBQIPpIgCJK5QBxVK6aVWVC2b+VnK39wxj+HeStNK/etPAhy14pD5zhnvHJQZKAJf8iQXStXOOPVYoE8hxjKCme8OliMc4qzc7wiXPQ/Dbp8wgh6lGTetvIbXTL6Hk+T0SE+tLLFGS8W//c/aQsxgs62lU84PoE4dNGhYuosEXcMqmf7dr0NauNnQl0jlO9H6HM6f3DoN3Gc48Bxz+hrfSo5xdnelhnY2iIPxbwoeZSSygo6cWlLkSKKaeUG+mmH2l0q7TZCvbfI61/Iifte999Xg3I3sG8VTqFskHaCo76njE8VsTMbw8sqFSzikBrmTimX0DvMDYDJaPMteOxQ7hhLptwFdZdI74/vk7Zock6E0vgQLjN50bzY0ECtNJoCJ9RfjySqdb7BaRxjI5S7vt4cZX26x3GfKoVn7vjMxvKiHOMdeHxHGigp3TPlYZnBISxD0K3Ah0aDboI+4PSwke+XQvm2lR/97wvwTnCFp1F1CT3PozxgxujQ38PxWU3BqwHvPVNeWG2Q5u1XkL3ZBnqnihjhStr0chNw4XRvmfYboe+x9rlocI34+HDfG6Txor4+RgwDHlO+g1ih/DOeRhbafmhVLBhdCttbnB6UtdNqHI6HEfQfmLKvkE9MBCuUf2Lq0eL5iOPoWjI+Ki9pNTlMAwt5NZTqNzhdxDCQISXSFFUc9LseRPrj93tObhj9u6l5SVnwVFuJlKDdKnWkSfI4lWM00CHxGE4w6dG+Pxfs5L5NxRbOOrGOyutGqLTGNHCC/Vqps8PLcAyD/JME6S8HdnKO8Jp4lJxwnvD6D901N4ePSIMVGtpE6sUuZ14C9ujyj9uMOgbdonjONyXKh4jXt4w6Bh2vx3mj5JM6dSkoWsQTmoVQ/gs63ijfDKbFczrhHl2SaNGFZDr+zxLapK2argS26CZyqE9J7xeM4+XQRX6XwYt0Hx2KFKVQdhcxYiCHJtvrSJctO8GmTeDSCDrzTI4xnQblmPV8rpX2fR7Hbec7PA9SeNVeuVaUiLRhGrDQ31hCSI5nGbsbxLcmKS9qMuyNdYw5DncboXAZv3Q/U/ffa6SPD2HZcwvFj4/N4OUivNSo4Sd601eoEc/G3YDAWrFrBh2WbM4S7HmbdSJPD4N8x3CQF9IQK0HXR7gKaeNDWEBfODajL9IzhQuVSu/9JYIhDHTHu498H9q0mZwk2yG/XMfQFtMOnTOsoDunCexpzn6H+P/fhram5PUIh7wB5wZSSm5Kbe+Q98LKcZJ0PQzyHYNwlciBk3pgq/QRjbM1ZpHXEGALCYoGA9BA5pzZaaUYwZZJ4OlvDxs8j2MQakw3Vgb5Yy9dRJY4bY0EOMRXJQ38GnnHS9K9RjynqRNsVYqtBgdeUj9CTqWOkdonfwNqE+w56LehZItymdjVtinldYE4Khw/99K5m87Ze4yDxbFTbQvtWhye7rcYz60UFsf/QuDHKvdh0uD47qHUlp/DJFt/Ae0l/y87it6YAAAAAElFTkSuQmCC';
  public uploadFiles = (files) => {
    if (files.length === 0) {
      return;
    }
    let filesToUpload: File[] = files;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.cardImageBase64 = e.target.result;
      console.log(this.cardImageBase64);
    };

    reader.readAsDataURL(filesToUpload[0]);
    // Array.from(filesToUpload).map((file, index) => {
    //   //reader.readAsDataURL(fileInput.target.files[0]);
    //   return this.formData.append('file' + index, file, file.name);
    // });
  };

  public uploadPost(
    famousFoodName: string,
    price: string,
    shopName: string,
    description: string,
    areaName: string,
    selectedCategory: string
  ) {
    let categoryId = 0;
    this.categorydetails.forEach((element) => {
      if (element.categoryName == selectedCategory) {
        categoryId = element.categoryId;
      }
    });

    let url =
      'https://bengaluruswada.herokuapp.com/api/Food/Uploadimage?famousFoodName=' +
      famousFoodName +
      '&price=' +
      price +
      '&latitude=' +
      localStorage.getItem('latitude') +
      '&longitude=' +
      localStorage.getItem('longitude') +
      '&catergoryId=' +
      categoryId +
      '&shopName=' +
      shopName +
      '&description=' +
      description +
      '&locationName=' +
      areaName;

    this.http
      .post(url, this.formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round((100 * event.loaded) / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });
    localStorage.clear();
  }
}
