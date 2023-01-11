import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalistInfoPageComponent } from './journalist-info-page.component';

describe('JournalistInfoPageComponent', () => {
  let component: JournalistInfoPageComponent;
  let fixture: ComponentFixture<JournalistInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalistInfoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalistInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
