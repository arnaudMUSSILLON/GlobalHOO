import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageOptionsPage } from './image-options.page';

describe('ImageOptionsPage', () => {
  let component: ImageOptionsPage;
  let fixture: ComponentFixture<ImageOptionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageOptionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageOptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
