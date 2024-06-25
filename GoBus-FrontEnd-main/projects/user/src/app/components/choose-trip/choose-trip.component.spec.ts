import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseTripComponent } from './choose-trip.component';

describe('ChooseTripComponent', () => {
  let component: ChooseTripComponent;
  let fixture: ComponentFixture<ChooseTripComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseTripComponent]
    });
    fixture = TestBed.createComponent(ChooseTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
