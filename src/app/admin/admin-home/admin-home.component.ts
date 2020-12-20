import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {LoadUsers} from "../../model/actions/user.actions";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadUsers());
  }

}
