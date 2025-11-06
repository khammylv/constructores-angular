import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicLogComponent } from './dynamic-log.component';

describe('DynamicLogComponent', () => {
  let component: DynamicLogComponent;
  let fixture: ComponentFixture<DynamicLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
