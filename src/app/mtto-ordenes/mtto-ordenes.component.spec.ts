import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MttoOrdenesComponent } from './mtto-ordenes.component';

describe('MttoOrdenesComponent', () => {
  let component: MttoOrdenesComponent;
  let fixture: ComponentFixture<MttoOrdenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MttoOrdenesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MttoOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
