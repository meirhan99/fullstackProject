import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDestinationComponent } from './update-destination.component';

describe('UpdateDestinationComponent', () => {
  let component: UpdateDestinationComponent;
  let fixture: ComponentFixture<UpdateDestinationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDestinationComponent]
    });
    fixture = TestBed.createComponent(UpdateDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
