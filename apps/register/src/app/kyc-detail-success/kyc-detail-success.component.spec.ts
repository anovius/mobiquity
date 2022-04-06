import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycDetailSuccessComponent } from './kyc-detail-success.component';

describe('KycDetailSuccessComponent', () => {
  let component: KycDetailSuccessComponent;
  let fixture: ComponentFixture<KycDetailSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KycDetailSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KycDetailSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
