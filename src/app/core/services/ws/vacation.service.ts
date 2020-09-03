import {HttpClient, HttpParams} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {AskResultDto, VacationDto, VacationSummary, ValidateVacDto} from "../../../model/dto";
import {EMPTY, Observable} from 'rxjs';
import {AppConfig} from "../../../../environments/environment";
import {formatDateForWs, retryHttp} from "../../../shared/helpers/utils.helper";
import {mergeMap, retryWhen} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
  })
export class VacationService {
  private static VACATION_URL = `${AppConfig.API_URL}/vacation`;
  constructor(private http: HttpClient){}

  getVacationList(id: number, start: Date, end: Date) : Observable<VacationDto[]>{
    const params = new HttpParams();
    params.set("start", formatDateForWs(start));
    params.set("end", formatDateForWs(end))
      return this.http.get<VacationDto[]>(`${VacationService.VACATION_URL}/${id}/period`, { params: params });
  }

  validate(id: number, vacationList: VacationDto[]): Observable<ValidateVacDto> {
    return this.http.put<ValidateVacDto>(`${VacationService.VACATION_URL}/${id}/validate`, vacationList)
      .pipe(retryWhen(retryHttp));
  }

  ask(id: number, vacationDtoToAsk: VacationDto[]): Observable<AskResultDto> {
    return this.http.post<AskResultDto>(`${VacationService.VACATION_URL}/${id}/ask`, vacationDtoToAsk)
      .pipe(retryWhen(retryHttp));
  }

  delete(id: number, vacationDtoToDelete: VacationDto[]): Observable<never> {
    const params = new HttpParams();
    params.set("vacationIdToDelete", vacationDtoToDelete.map(value => value.id).toString())
    return this.http.delete(`${VacationService.VACATION_URL}/${id}/deleteById`, { params: params })
      .pipe(retryWhen(retryHttp), mergeMap(_ => EMPTY));
  }

  compute(id: number, dateYear: Date): Observable<VacationSummary> {
    const params = new HttpParams();
    params.set("date", formatDateForWs(dateYear))
    return this.http.get<VacationSummary>(`${VacationService.VACATION_URL}/${id}/compute`, { params: params })
      .pipe(retryWhen(retryHttp));
  }
}
