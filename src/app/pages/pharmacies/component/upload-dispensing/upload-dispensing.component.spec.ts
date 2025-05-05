import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDispensingComponent } from './upload-dispensing.component';

describe('UploadDispensingComponent', () => {
  let component: UploadDispensingComponent;
  let fixture: ComponentFixture<UploadDispensingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadDispensingComponent]
    });
    fixture = TestBed.createComponent(UploadDispensingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
