import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostingActionsComponent } from './posting-actions.component';

describe('PostingActionsComponent', () => {
  let component: PostingActionsComponent;
  let fixture: ComponentFixture<PostingActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostingActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostingActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
