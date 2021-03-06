import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninSignupComponent } from './signin-signup/signin-signup.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchLocationComponent } from './search-location/search-location.component';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { environment } from 'src/environments/environment';
import { PostFoodItemComponent } from './post-food-item/post-food-item.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxHmCarouselModule } from 'ngx-hm-carousel';
@NgModule({
  declarations: [
    AppComponent,
    SigninSignupComponent,
    SearchLocationComponent,
    HomePageComponent,
    FoodDetailComponent,
    PostFoodItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxDropzoneModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,

    NgxHmCarouselModule,
    RouterModule.forRoot([
      { path: 'signin-signup', component: SigninSignupComponent },
      { path: 'search-location', component: SearchLocationComponent },
      { path: 'home-page', component: HomePageComponent },
      { path: 'food-detail', component: FoodDetailComponent },
      { path: 'post-food-item', component: PostFoodItemComponent },
    ]),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
