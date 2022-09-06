import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MttoTemporadasComponent } from './mtto-temporadas.component';

describe('MttoTemporadasComponent', () => {
  let component: MttoTemporadasComponent;
  let fixture: ComponentFixture<MttoTemporadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MttoTemporadasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MttoTemporadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
