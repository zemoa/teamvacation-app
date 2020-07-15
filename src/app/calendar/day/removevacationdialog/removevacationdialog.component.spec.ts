import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovevacationdialogComponent } from './removevacationdialog.component';

describe('RemovevacationdialogComponent', () => {
  let component: RemovevacationdialogComponent;
  let fixture: ComponentFixture<RemovevacationdialogComponent>;

  beforeEach(async(() => {
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
