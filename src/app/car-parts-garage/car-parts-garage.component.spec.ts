import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPartsGarageComponent } from './car-parts-garage.component';

describe('CarPartsGarageComponent', () => {
  let component: CarPartsGarageComponent;
  let fixture: ComponentFixture<CarPartsGarageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarPartsGarageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarPartsGarageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
