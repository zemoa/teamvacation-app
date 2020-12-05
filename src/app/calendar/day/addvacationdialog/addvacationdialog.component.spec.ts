import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddvacationdialogComponent } from './addvacationdialog.component';

describe('AddvacationdialogComponent', () => {
  let component: AddvacationdialogComponent;
  let fixture: ComponentFixture<AddvacationdialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddvacationdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddvacationdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
