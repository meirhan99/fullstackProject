import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBusClassesComponent } from './all-bus-classes.component';

describe('AllBusClassesComponent', () => {
  let component: AllBusClassesComponent;
  let fixture: ComponentFixture<AllBusClassesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllBusClassesComponent]
    });
    fixture = TestBed.createComponent(AllBusClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
