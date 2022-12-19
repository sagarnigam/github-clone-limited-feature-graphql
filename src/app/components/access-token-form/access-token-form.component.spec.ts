import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessTokenFormComponent } from './access-token-form.component';

describe('AccessTokenFormComponent', () => {
  let component: AccessTokenFormComponent;
  let fixture: ComponentFixture<AccessTokenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessTokenFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessTokenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
