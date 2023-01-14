import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOptionsNotLoggedInComponent } from './account-options-not-logged-in.component';

describe('AccountOptionsNotLoggedInComponent', () => {
  let component: AccountOptionsNotLoggedInComponent;
  let fixture: ComponentFixture<AccountOptionsNotLoggedInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOptionsNotLoggedInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountOptionsNotLoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
