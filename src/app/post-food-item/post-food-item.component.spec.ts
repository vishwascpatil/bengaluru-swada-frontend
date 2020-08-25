import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFoodItemComponent } from './post-food-item.component';

describe('PostFoodItemComponent', () => {
  let component: PostFoodItemComponent;
  let fixture: ComponentFixture<PostFoodItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostFoodItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFoodItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
