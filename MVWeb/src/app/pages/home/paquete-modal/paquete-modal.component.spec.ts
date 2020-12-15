import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaqueteModalComponent } from './paquete-modal.component';

describe('PaqueteModalComponent', () => {
  let component: PaqueteModalComponent;
  let fixture: ComponentFixture<PaqueteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaqueteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaqueteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
