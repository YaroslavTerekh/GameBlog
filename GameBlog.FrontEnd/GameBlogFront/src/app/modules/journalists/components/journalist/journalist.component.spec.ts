import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalistComponent } from './journalist.component';

describe('JournalistComponent', () => {
  let component: JournalistComponent;
  let fixture: ComponentFixture<JournalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
