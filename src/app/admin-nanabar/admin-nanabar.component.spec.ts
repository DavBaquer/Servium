import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNanabarComponent } from './admin-nanabar.component';

describe('AdminNanabarComponent', () => {
  let component: AdminNanabarComponent;
  let fixture: ComponentFixture<AdminNanabarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNanabarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNanabarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
