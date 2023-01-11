import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopJournalistsComponent } from './top-journalists.component';

describe('TopJournalistsComponent', () => {
  let component: TopJournalistsComponent;
  let fixture: ComponentFixture<TopJournalistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopJournalistsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopJournalistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
