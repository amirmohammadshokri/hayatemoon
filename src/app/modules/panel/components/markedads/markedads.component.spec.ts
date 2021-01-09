import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkedadsComponent } from './markedads.component';

describe('MarkedadsComponent', () => {
  let component: MarkedadsComponent;
  let fixture: ComponentFixture<MarkedadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkedadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkedadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
