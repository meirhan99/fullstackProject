import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBranchComponent } from './delete-branch.component';

describe('DeleteBranchComponent', () => {
  let component: DeleteBranchComponent;
  let fixture: ComponentFixture<DeleteBranchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteBranchComponent]
    });
    fixture = TestBed.createComponent(DeleteBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
