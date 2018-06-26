import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnsContainerComponent } from './anns-container.component';

describe('AnnsContainerComponent', () => {
  let component: AnnsContainerComponent;
  let fixture: ComponentFixture<AnnsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
