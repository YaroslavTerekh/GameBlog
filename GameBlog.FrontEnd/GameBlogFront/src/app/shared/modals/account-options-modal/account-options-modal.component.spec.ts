import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOptionsModalComponent } from './account-options-modal.component';

describe('AccountOptionsModalComponent', () => {
  let component: AccountOptionsModalComponent;
  let fixture: ComponentFixture<AccountOptionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOptionsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountOptionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
