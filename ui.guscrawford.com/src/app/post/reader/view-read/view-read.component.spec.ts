import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReadComponent } from './view-read.component';

describe('ViewReadComponent', () => {
  let component: ViewReadComponent;
  let fixture: ComponentFixture<ViewReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
