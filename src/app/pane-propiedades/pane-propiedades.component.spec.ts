import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanePropiedadesComponent } from './pane-propiedades.component';

describe('PanePropiedadesComponent', () => {
  let component: PanePropiedadesComponent;
  let fixture: ComponentFixture<PanePropiedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanePropiedadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanePropiedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
