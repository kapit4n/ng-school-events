import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherInfoEditComponent } from './teacher-info-edit.component';

describe('TeacherInfoEditComponent', () => {
  let component: TeacherInfoEditComponent;
  let fixture: ComponentFixture<TeacherInfoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherInfoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
