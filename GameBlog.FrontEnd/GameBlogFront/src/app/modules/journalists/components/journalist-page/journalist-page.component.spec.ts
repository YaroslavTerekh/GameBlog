import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalistPageComponent } from './journalist-page.component';

describe('JournalistPageComponent', () => {
  let component: JournalistPageComponent;
  let fixture: ComponentFixture<JournalistPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalistPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
