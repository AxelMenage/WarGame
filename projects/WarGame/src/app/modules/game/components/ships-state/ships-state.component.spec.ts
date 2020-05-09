import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipsStateComponent } from './ships-state.component';

describe('ShipsStateComponent', () => {
  let component: ShipsStateComponent;
  let fixture: ComponentFixture<ShipsStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipsStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipsStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
