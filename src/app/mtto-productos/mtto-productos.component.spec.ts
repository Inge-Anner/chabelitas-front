import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MttoProductosComponent } from './mtto-productos.component';

describe('MttoProductosComponent', () => {
  let component: MttoProductosComponent;
  let fixture: ComponentFixture<MttoProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MttoProductosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MttoProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
