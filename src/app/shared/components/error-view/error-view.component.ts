import {Component, OnInit} from '@angular/core';
import {TVError} from "../../../model/TVError";
import {BehaviorSubject, Observable} from "rxjs";
import * as _ from "lodash";
import {Store} from "@ngxs/store";
import {RemoveLastError} from "../../../model/actions/error.actions";

@Component({
  selector: 'app-error-view',
  templateUrl: './error-view.component.html',
  styleUrls: ['./error-view.component.scss']
})
export class ErrorViewComponent implements OnInit {
  errorsSubject: BehaviorSubject<TVError[]>;
  errors$: Observable<TVError[]>;
  constructor(private store: Store ) {
    this.errorsSubject = new BehaviorSubject<TVError[]>([])
    this.errors$ = this.errorsSubject.asObservable();
    this.store.select(state => state.errorState.lastError).subscribe(
      lastError => {
        if(lastError) {
          this.errorsSubject.next([...this.errorsSubject.value, lastError])
          this.store.dispatch(new RemoveLastError());
        }
      }
    )
  }

  ngOnInit(): void {
  }

  closeError(index: number) {
    let tmpErrors = this.errorsSubject.value;
    _.pullAt(tmpErrors, [index]);
    this.errorsSubject.next(tmpErrors);
  }
}
