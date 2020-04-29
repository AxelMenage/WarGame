import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckPageComponent } from './deck-page.component';

describe('DeckPageComponent', () => {
  let component: DeckPageComponent;
  let fixture: ComponentFixture<DeckPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
