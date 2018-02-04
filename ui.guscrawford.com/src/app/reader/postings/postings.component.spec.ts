import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostingsComponent } from './postings.component';

describe('PostingsComponent', () => {
  let component: PostingsComponent;
  let fixture: ComponentFixture<PostingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
