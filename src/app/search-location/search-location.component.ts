import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { SearchLocationService, Feature } from './search-location.service';

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.css'],
})
export class SearchLocationComponent implements OnInit {
  constructor(
    private searchLocationService: SearchLocationService,
    private router: Router
  ) {}
  control = new FormControl();

  locationslist: string[] = [];
  locationName: string = '';
  filteredStreets: Observable<string[]>;

  ngOnInit() {
    this.searchLocationService.GetLocations().subscribe((locations) => {
      this.locationslist = locations;
    });
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    this.searchLocationService.locationname = filterValue;
    return this.locationslist.filter((street) =>
      this._normalizeValue(street).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  public navigate(): void {
    this.searchLocationService.locationname;
    this.router.navigate(['home-page']);
  }
}
