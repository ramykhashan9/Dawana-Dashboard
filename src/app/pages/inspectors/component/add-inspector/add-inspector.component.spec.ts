import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInspectorComponent } from './add-inspector.component';

describe('AddInspectorComponent', () => {
  let component: AddInspectorComponent;
  let fixture: ComponentFixture<AddInspectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInspectorComponent]
    });
    fixture = TestBed.createComponent(AddInspectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
