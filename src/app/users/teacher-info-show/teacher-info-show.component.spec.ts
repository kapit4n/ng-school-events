import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherInfoShowComponent } from './teacher-info-show.component';

describe('TeacherInfoShowComponent', () => {
  let component: TeacherInfoShowComponent;
  let fixture: ComponentFixture<TeacherInfoShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherInfoShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherInfoShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
