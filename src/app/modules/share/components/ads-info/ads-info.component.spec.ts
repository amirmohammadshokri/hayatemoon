import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsInfoComponent } from './ads-info.component';

describe('AdsInfoComponent', () => {
  let component: AdsInfoComponent;
  let fixture: ComponentFixture<AdsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
