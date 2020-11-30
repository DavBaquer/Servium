import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeUsuarioComponent } from './upgrade-usuario.component';

describe('UpgradeUsuarioComponent', () => {
  let component: UpgradeUsuarioComponent;
  let fixture: ComponentFixture<UpgradeUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpgradeUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
