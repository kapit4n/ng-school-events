import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnHomeComponent } from './ann-home.component';

describe('AnnHomeComponent', () => {
  let component: AnnHomeComponent;
  let fixture: ComponentFixture<AnnHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
