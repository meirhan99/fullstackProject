import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPublicActivityComponent } from './add-public-activity.component';

describe('AddPublicActivityComponent', () => {
  let component: AddPublicActivityComponent;
  let fixture: ComponentFixture<AddPublicActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPublicActivityComponent]
    });
    fixture = TestBed.createComponent(AddPublicActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
