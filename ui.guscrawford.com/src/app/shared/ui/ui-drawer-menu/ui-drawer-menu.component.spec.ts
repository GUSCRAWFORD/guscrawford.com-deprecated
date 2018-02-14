import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiDrawerMenuComponent } from './ui-drawer-menu.component';

describe('UiDrawerMenuComponent', () => {
  let component: UiDrawerMenuComponent;
  let fixture: ComponentFixture<UiDrawerMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiDrawerMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiDrawerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
