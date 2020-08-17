import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

export interface ModifysecretdialogData {
  secret: string
}

export const mustMatch: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const secret = control.get('secret');
  const confirmSecret = control.get('confirmSecret');

  return secret.value !== confirmSecret.value ? {confirmSecretError: true}: null;
};

@Component({
  selector: 'app-modifysecretdialog',
  templateUrl: './modifysecretdialog.component.html',
  styleUrls: ['./modifysecretdialog.component.scss']
})
export class ModifysecretdialogComponent implements OnInit {
  secretForm = new FormGroup({
    secret: new FormControl('', [Validators.minLength(3), Validators.required, ]),
    confirmSecret: new FormControl('', Validators.required)
  }, {
    validators: mustMatch
  }
  )
  constructor(@Inject(MAT_DIALOG_DATA) public data: ModifysecretdialogData) { }

  ngOnInit(): void {
  }
}


