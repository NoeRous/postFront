import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEditFormPostulationComponent } from './page-edit-form-postulation.component';

describe('PageEditFormPostulationComponent', () => {
  let component: PageEditFormPostulationComponent;
  let fixture: ComponentFixture<PageEditFormPostulationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageEditFormPostulationComponent]
    });
    fixture = TestBed.createComponent(PageEditFormPostulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
