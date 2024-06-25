import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicActivityComponent } from './public-activity.component';

describe('PublicActivityComponent', () => {
  let component: PublicActivityComponent;
  let fixture: ComponentFixture<PublicActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicActivityComponent]
    });
    fixture = TestBed.createComponent(PublicActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
