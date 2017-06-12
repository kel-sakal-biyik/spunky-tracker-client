import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationMeterComponent } from './location-meter.component';

describe('LocationMeterComponent', () => {
  let component: LocationMeterComponent;
  let fixture: ComponentFixture<LocationMeterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationMeterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
