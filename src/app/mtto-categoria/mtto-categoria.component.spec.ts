import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MttoCategoriaComponent } from './mtto-categoria.component';

describe('MttoCategoriaComponent', () => {
  let component: MttoCategoriaComponent;
  let fixture: ComponentFixture<MttoCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MttoCategoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MttoCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
