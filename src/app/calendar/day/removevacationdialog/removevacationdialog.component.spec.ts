import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RemovevacationdialogComponent } from './removevacationdialog.component';

describe('RemovevacationdialogComponent', () => {
  let component: RemovevacationdialogComponent;
  let fixture: ComponentFixture<RemovevacationdialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RemovevacationdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovevacationdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
