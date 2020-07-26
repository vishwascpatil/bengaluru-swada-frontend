import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import {} from '@angular/compiler';

@Component({
  selector: 'signin-signup',
  templateUrl: './signin-signup.component.html',
  styleUrls: ['./signin-signup.component.css'],
})
export class SigninSignupComponent implements OnInit {
  constructor(
    // private signinSignupService: SigninSignupService,
    private router: Router
  ) {}
  // errorMessage: string;
  // bindingworks: any;
  // Bindingworks: string = 'componenet';

  // hi: any = this.signinSignupService.getproduct().subscribe({
  //   next: (products) => (this.bindingworks = products),
  //   error: (err) => (this.errorMessage = err),
  // });
  // displaylogin: Boolean = true;
  // navigate(): void {
  //   this.displaylogin = false;
  //   this.router.navigate(
  // }

  ngOnInit(): void {}
}
