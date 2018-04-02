import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonneRechComponent } from './personne-rech.component';

describe('PersonneRechComponent', () => {
  let component: PersonneRechComponent;
  let fixture: ComponentFixture<PersonneRechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonneRechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonneRechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
