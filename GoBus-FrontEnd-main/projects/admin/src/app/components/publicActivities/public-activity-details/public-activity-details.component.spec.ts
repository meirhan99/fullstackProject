import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicActivityDetailsComponent } from './public-activity-details.component';

describe('PublicActivityDetailsComponent', () => {
  let component: PublicActivityDetailsComponent;
  let fixture: ComponentFixture<PublicActivityDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicActivityDetailsComponent]
    });
    fixture = TestBed.createComponent(PublicActivityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
