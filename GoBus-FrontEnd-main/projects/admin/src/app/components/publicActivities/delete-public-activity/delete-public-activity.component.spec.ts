import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePublicActivityComponent } from './delete-public-activity.component';

describe('DeletePublicActivityComponent', () => {
  let component: DeletePublicActivityComponent;
  let fixture: ComponentFixture<DeletePublicActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletePublicActivityComponent]
    });
    fixture = TestBed.createComponent(DeletePublicActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
