import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPropiedadComponent } from './lista-propiedad.component';

describe('ListaPropiedadComponent', () => {
  let component: ListaPropiedadComponent;
  let fixture: ComponentFixture<ListaPropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPropiedadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
