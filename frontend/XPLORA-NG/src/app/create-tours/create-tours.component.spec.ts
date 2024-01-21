import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateToursComponent } from './create-tours.component';

describe('CreateToursComponent', () => {
  let component: CreateToursComponent;
  let fixture: ComponentFixture<CreateToursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateToursComponent]
    });
    fixture = TestBed.createComponent(CreateToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
