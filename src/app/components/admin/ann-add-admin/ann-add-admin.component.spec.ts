import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnAddAdminComponent } from './ann-add-admin.component';

describe('AnnAddAdminComponent', () => {
  let component: AnnAddAdminComponent;
  let fixture: ComponentFixture<AnnAddAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnAddAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnAddAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
