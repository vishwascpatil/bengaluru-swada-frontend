import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninSignupComponent } from './signin-signup/signin-signup.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchLocationComponent } from './search-location/search-location/search-location.component';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninSignupComponent,
    SearchLocationComponent,
    HomePageComponent,
    FoodDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'signin-signup', component: SigninSignupComponent },
      { path: 'search-location', component: SearchLocationComponent },
      { path: 'home-page', component: HomePageComponent },
      { path: 'food-detail', component: FoodDetailComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
