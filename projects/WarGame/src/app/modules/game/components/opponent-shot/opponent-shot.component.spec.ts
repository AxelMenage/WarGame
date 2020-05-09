import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpponentShotComponent } from './opponent-shot.component';

describe('OpponentShotComponent', () => {
  let component: OpponentShotComponent;
  let fixture: ComponentFixture<OpponentShotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpponentShotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpponentShotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
