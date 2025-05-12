import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMobileVersionComponent } from './update-mobile-version.component';

describe('UpdateMobileVersionComponent', () => {
  let component: UpdateMobileVersionComponent;
  let fixture: ComponentFixture<UpdateMobileVersionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMobileVersionComponent]
    });
    fixture = TestBed.createComponent(UpdateMobileVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
