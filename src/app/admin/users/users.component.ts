import { Component, OnInit } from '@angular/core';

export interface User {
  firstname: string;
  lastname: string;
}

const ELEMENT_DATA: User[] = [
  {firstname: 'toto', lastname: 'titi'},
  {firstname: 'prénom', lastname: 'nom'}
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ['firstname', 'lastname'];
  constructor() { }

  ngOnInit(): void {
  }

}
