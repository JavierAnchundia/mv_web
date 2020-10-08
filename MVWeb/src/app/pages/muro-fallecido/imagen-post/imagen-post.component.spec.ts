import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenPostComponent } from './imagen-post.component';

describe('ImagenPostComponent', () => {
  let component: ImagenPostComponent;
  let fixture: ComponentFixture<ImagenPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagenPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
