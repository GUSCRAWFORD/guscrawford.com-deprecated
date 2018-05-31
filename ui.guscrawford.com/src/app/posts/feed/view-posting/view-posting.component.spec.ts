import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPostingComponent } from './view-posting.component';

describe('ViewPostingComponent', () => {
  let component: ViewPostingComponent;
  let fixture: ComponentFixture<ViewPostingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPostingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
