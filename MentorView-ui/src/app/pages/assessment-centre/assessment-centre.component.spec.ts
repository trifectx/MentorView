import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentCentreComponent } from './assessment-centre.component';

describe('AssessmentCentreComponent', () => {
  let component: AssessmentCentreComponent;
  let fixture: ComponentFixture<AssessmentCentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentCentreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
