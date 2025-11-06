import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOrdenesComponent } from './form-ordenes.component';

describe('FormOrdenesComponent', () => {
  let component: FormOrdenesComponent;
  let fixture: ComponentFixture<FormOrdenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormOrdenesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
