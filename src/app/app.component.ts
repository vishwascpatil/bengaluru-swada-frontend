import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router) {}
  hidestartpage: boolean = false;
  navigate(): void {
    this.hidestartpage = true;
    this.router.navigate(['signin-signup']);
  }
}
