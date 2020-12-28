import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubePostComponent } from './youtube-post.component';

describe('YoutubePostComponent', () => {
  let component: YoutubePostComponent;
  let fixture: ComponentFixture<YoutubePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
