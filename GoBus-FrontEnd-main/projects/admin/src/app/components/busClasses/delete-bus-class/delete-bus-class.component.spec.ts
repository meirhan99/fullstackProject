import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBusClassComponent } from './delete-bus-class.component';

describe('DeleteBusClassComponent', () => {
  let component: DeleteBusClassComponent;
  let fixture: ComponentFixture<DeleteBusClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteBusClassComponent]
    });
    fixture = TestBed.createComponent(DeleteBusClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
