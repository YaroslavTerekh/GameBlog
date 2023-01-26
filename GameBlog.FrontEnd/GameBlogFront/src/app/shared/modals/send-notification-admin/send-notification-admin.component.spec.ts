import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendNotificationAdminComponent } from './send-notification-admin.component';

describe('SendNotificationAdminComponent', () => {
  let component: SendNotificationAdminComponent;
  let fixture: ComponentFixture<SendNotificationAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendNotificationAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendNotificationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
