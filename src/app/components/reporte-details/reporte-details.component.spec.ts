import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteDetailsComponent } from './reporte-details.component';

describe('ReporteDetailsComponent', () => {
  let component: ReporteDetailsComponent;
  let fixture: ComponentFixture<ReporteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
