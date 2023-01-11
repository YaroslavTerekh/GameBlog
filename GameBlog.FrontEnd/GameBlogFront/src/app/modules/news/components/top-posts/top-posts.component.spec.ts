import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPostsComponent } from './top-posts.component';

describe('TopPostsComponent', () => {
  let component: TopPostsComponent;
  let fixture: ComponentFixture<TopPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
