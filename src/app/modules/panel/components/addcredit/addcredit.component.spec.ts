import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcreditComponent } from './addcredit.component';

describe('AddcreditComponent', () => {
  let component: AddcreditComponent;
  let fixture: ComponentFixture<AddcreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
