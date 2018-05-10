import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCurrentComponent } from './gestion-current.component';

describe('GestionCurrentComponent', () => {
  let component: GestionCurrentComponent;
  let fixture: ComponentFixture<GestionCurrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionCurrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
