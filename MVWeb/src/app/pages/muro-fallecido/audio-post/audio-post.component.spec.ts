import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioPostComponent } from './audio-post.component';

describe('AudioPostComponent', () => {
  let component: AudioPostComponent;
  let fixture: ComponentFixture<AudioPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
