import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuroFallecidoComponent } from './muro-fallecido.component';

describe('MuroFallecidoComponent', () => {
  let component: MuroFallecidoComponent;
  let fixture: ComponentFixture<MuroFallecidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuroFallecidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuroFallecidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
