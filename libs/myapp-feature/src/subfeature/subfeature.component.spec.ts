import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubfeatureComponent } from './subfeature.component';

describe('SubfeatureComponent', () => {
  let component: SubfeatureComponent;
  let fixture: ComponentFixture<SubfeatureComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [SubfeatureComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SubfeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
