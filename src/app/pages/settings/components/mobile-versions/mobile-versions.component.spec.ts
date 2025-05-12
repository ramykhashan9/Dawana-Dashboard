import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileVersionsComponent } from './mobile-versions.component';

describe('MobileVersionsComponent', () => {
  let component: MobileVersionsComponent;
  let fixture: ComponentFixture<MobileVersionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileVersionsComponent]
    });
    fixture = TestBed.createComponent(MobileVersionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
