import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePhaseActionComponent } from './page-phase-action.component';

describe('PagePhaseActionComponent', () => {
  let component: PagePhaseActionComponent;
  let fixture: ComponentFixture<PagePhaseActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagePhaseActionComponent]
    });
    fixture = TestBed.createComponent(PagePhaseActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
