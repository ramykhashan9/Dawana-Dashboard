import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMobileVersionComponent } from './add-mobile-version.component';

describe('AddMobileVersionComponent', () => {
  let component: AddMobileVersionComponent;
  let fixture: ComponentFixture<AddMobileVersionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMobileVersionComponent]
    });
    fixture = TestBed.createComponent(AddMobileVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
