import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdverComponent } from './manage-adver.component';

describe('ManageAdverComponent', () => {
  let component: ManageAdverComponent;
  let fixture: ComponentFixture<ManageAdverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAdverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAdverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
