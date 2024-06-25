import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBusClassComponent } from './update-bus-class.component';

describe('UpdateBusClassComponent', () => {
  let component: UpdateBusClassComponent;
  let fixture: ComponentFixture<UpdateBusClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateBusClassComponent]
    });
    fixture = TestBed.createComponent(UpdateBusClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
