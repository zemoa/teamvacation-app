import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { VacationDto } from "../../../model/dto";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class VacationService {
    constructor(private http: HttpClient){}

    getVacationList() : Observable<VacationDto[]>{
        return this.http.get<VacationDto[]>('');
    }
}