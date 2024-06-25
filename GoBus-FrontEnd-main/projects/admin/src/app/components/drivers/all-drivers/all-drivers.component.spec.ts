import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDriversComponent } from './all-drivers.component';

describe('AllDriversComponent', () => {
  let component: AllDriversComponent;
  let fixture: ComponentFixture<AllDriversComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllDriversComponent]
    });
    fixture = TestBed.createComponent(AllDriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
