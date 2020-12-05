import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModifysecretdialogComponent } from './modifysecretdialog.component';

describe('ModifysecretdialogComponent', () => {
  let component: ModifysecretdialogComponent;
  let fixture: ComponentFixture<ModifysecretdialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifysecretdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifysecretdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
