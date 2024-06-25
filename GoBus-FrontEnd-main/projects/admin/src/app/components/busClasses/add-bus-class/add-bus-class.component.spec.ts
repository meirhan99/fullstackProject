import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBusClassComponent } from './add-bus-class.component';

describe('AddBusClassComponent', () => {
  let component: AddBusClassComponent;
  let fixture: ComponentFixture<AddBusClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBusClassComponent]
    });
    fixture = TestBed.createComponent(AddBusClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
