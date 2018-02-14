import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiDrawerPageWrapComponent } from './ui-drawer-page-wrap.component';

describe('UiDrawerPageWrapComponent', () => {
  let component: UiDrawerPageWrapComponent;
  let fixture: ComponentFixture<UiDrawerPageWrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiDrawerPageWrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiDrawerPageWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
