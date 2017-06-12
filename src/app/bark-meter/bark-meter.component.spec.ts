import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarkMeterComponent } from './bark-meter.component';

describe('BarkMeterComponent', () => {
  let component: BarkMeterComponent;
  let fixture: ComponentFixture<BarkMeterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarkMeterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarkMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
