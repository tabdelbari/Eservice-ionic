import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemmandePage } from './demmande.page';

describe('DemmandePage', () => {
  let component: DemmandePage;
  let fixture: ComponentFixture<DemmandePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemmandePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemmandePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
