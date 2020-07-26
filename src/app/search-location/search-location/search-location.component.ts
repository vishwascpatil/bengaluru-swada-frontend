import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.css'],
})
export class SearchLocationComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  back(): void {
    this.router.navigate(['/signin-signup']);
  }
  navigate(): void {
    this.router.navigate(['home-page']);
  }
}
