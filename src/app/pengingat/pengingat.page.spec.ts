import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PengingatPage } from './pengingat.page';

describe('PengingatPage', () => {
  let component: PengingatPage;
  let fixture: ComponentFixture<PengingatPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PengingatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
