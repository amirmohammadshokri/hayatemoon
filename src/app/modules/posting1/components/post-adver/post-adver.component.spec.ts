import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAdverComponent } from './post-adver.component';

describe('PostAdverComponent', () => {
  let component: PostAdverComponent;
  let fixture: ComponentFixture<PostAdverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostAdverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAdverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
