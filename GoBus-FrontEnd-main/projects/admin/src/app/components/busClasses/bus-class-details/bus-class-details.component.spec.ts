import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusClassDetailsComponent } from './bus-class-details.component';

describe('BusClassDetailsComponent', () => {
  let component: BusClassDetailsComponent;
  let fixture: ComponentFixture<BusClassDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusClassDetailsComponent]
    });
    fixture = TestBed.createComponent(BusClassDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
