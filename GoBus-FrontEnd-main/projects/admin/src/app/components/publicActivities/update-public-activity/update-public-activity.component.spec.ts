import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePublicActivityComponent } from './update-public-activity.component';

describe('UpdatePublicActivityComponent', () => {
  let component: UpdatePublicActivityComponent;
  let fixture: ComponentFixture<UpdatePublicActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePublicActivityComponent]
    });
    fixture = TestBed.createComponent(UpdatePublicActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
