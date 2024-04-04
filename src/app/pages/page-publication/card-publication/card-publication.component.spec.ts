import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPublicationComponent } from './card-publication.component';

describe('CardPublicationComponent', () => {
  let component: CardPublicationComponent;
  let fixture: ComponentFixture<CardPublicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardPublicationComponent]
    });
    fixture = TestBed.createComponent(CardPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
