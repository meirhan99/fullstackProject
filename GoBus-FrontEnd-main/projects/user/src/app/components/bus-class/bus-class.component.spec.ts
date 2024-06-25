import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusClassComponent } from './bus-class.component';

describe('BusClassComponent', () => {
  let component: BusClassComponent;
  let fixture: ComponentFixture<BusClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusClassComponent]
    });
    fixture = TestBed.createComponent(BusClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
