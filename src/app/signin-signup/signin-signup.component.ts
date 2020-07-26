import { Component, OnInit, NgModule, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { LiteralExpr } from '@angular/compiler';

@Component({
  selector: 'signin-signup',
  templateUrl: './signin-signup.component.html',
  styleUrls: ['./signin-signup.component.css'],
})
export class SigninSignupComponent implements OnInit {
  constructor(
    // private signinSignupService: SigninSignupService,
    private router: Router,
    private el: ElementRef
  ) {}
  // errorMessage: string;
  // bindingworks: any;
  // Bindingworks: string = 'componenet';

  // hi: any = this.signinSignupService.getproduct().subscribe({
  //   next: (products) => (this.bindingworks = products),
  //   error: (err) => (this.errorMessage = err),
  // });
  // displaylogin: Boolean = true;
  navigate(): void {
    this.router.navigate(['search-location']);
  }
  navigatesignin(): void {
    let signincontainer = this.el.nativeElement.querySelector('.container');

    signincontainer.classList.remove('sign-up-mode');
  }

  navigatesignup(): void {
    let signupcontainer = this.el.nativeElement.querySelector('.container');
    signupcontainer.classList.add('sign-up-mode');
  }

  ngOnInit(): void {}
}
