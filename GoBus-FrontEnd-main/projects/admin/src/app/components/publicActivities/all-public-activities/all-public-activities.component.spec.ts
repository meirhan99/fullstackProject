import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPublicActivitiesComponent } from './all-public-activities.component';

describe('AllPublicActivitiesComponent', () => {
  let component: AllPublicActivitiesComponent;
  let fixture: ComponentFixture<AllPublicActivitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllPublicActivitiesComponent]
    });
    fixture = TestBed.createComponent(AllPublicActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
