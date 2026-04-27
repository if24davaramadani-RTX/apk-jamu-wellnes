import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JamuPage } from './jamu.page';

describe('JamuPage', () => {
  let component: JamuPage;
  let fixture: ComponentFixture<JamuPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JamuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
