import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {
    AskResultDto,
    VacationDay,
    VacationDto,
    VacationSummary,
    VacationType,
    ValidateVacDto
} from "../../../model/dto";
import {EMPTY, Observable} from 'rxjs';
import {AppConfig} from "../../../../environments/environment";
import {Constants, formatDateForWs, retryHttp} from "../../../shared/helpers/utils.helper";
import {mergeMap, retryWhen} from "rxjs/operators";
import {Day} from "../../../model/day";
import * as moment from "moment";
import {IpcRenderer} from "electron";

@Injectable({
    providedIn: 'root'
})
export class VacationService {
    private static VACATION_URL = `${AppConfig.API_URL}/vacation`;
    protected ipc: IpcRenderer | undefined;
    constructor(private http: HttpClient){
        if(window.require) {
            try {
                this.ipc = window.require('electron').ipcRenderer;
            } catch (e) {
                throw e;
            }
        }
    }

    getVacationList(id: number, start: Date, end: Date) : Observable<VacationDto[]>{
        const params = new HttpParams();
        params.set("start", formatDateForWs(start));
        params.set("end", formatDateForWs(end));
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
        const vacationIdToDelete = vacationDtoToDelete.map(value => value.id).toString();
        return this.http.delete(`${VacationService.VACATION_URL}/${id}/deleteById/${vacationIdToDelete}`)
            .pipe(retryWhen(retryHttp), mergeMap(_ => EMPTY));
    }

    compute(id: number, dateYear: Date): Observable<VacationSummary> {
        const params = new HttpParams();
        params.set("date", formatDateForWs(dateYear));
        return this.http.get<VacationSummary>(`${VacationService.VACATION_URL}/${id}/compute`, { params: params })
            .pipe(retryWhen(retryHttp));
    }

    convertVacationDtoToDay(dto: VacationDto): Day {
        const day = new Day();
        day.date = moment(dto.date, Constants.DATE_FORMAT_WS).toDate();
        if(dto.vacationDay == VacationDay.ALL || dto.vacationDay == VacationDay.MORNING) {
            day.am.id = dto.id;
            day.am.type = dto.type;
            day.am.validated = dto.validated;
        }

        if(dto.vacationDay == VacationDay.ALL || dto.vacationDay == VacationDay.AFTERNOON) {
            day.pm.id = dto.id;
            day.pm.type = dto.type;
            day.pm.validated = dto.validated;
        }
        return day;
    }

    sendMail(askDto: AskResultDto) {
        const to = askDto.mailto;
        const from = askDto.mailfrom;
        let cc: string;
        if(askDto.ccList) {
            cc = askDto.ccList.join(";");
        }
        const subject = "New vacation to validate TODO";
        const msg = askDto.message;
        const mailToScheme = `mailto:${to}?subject=${encodeURI(subject)}&body=${msg}${cc?cc:''}`;
        if(this.ipc) {
            this.ipc.send("sendMail", mailToScheme);
        } else {
            console.log(mailToScheme);
        }
    }

    convertDayToVacationDto(day: Day): VacationDto[] {
        const vacationDtoList: VacationDto[] = [];
        const dateStr = moment(day.date).format(Constants.DATE_FORMAT_WS);
        if(day.am.modified) {
            if (day.am.type && day.am.type !== VacationType.UNKNOWN) {
                vacationDtoList.push({
                    validated: false,
                    type: day.am.type,
                    id: -1,
                    date: dateStr,
                    vacationDay: VacationDay.MORNING
                });
            } else if (day.am.id > -1) {
                vacationDtoList.push({
                    validated: false,
                    type: VacationType.UNKNOWN,
                    id: day.am.id,
                    date: dateStr,
                    vacationDay: VacationDay.MORNING
                });
            }
        }
        if(day.pm.modified) {
            if (day.pm.type && day.pm.type !== VacationType.UNKNOWN) {
                vacationDtoList.push({
                    validated: false,
                    type: day.pm.type,
                    id: -1,
                    date: dateStr,
                    vacationDay: VacationDay.AFTERNOON
                });
            } else if (day.pm.id > -1) {
                vacationDtoList.push({
                    validated: false,
                    type: VacationType.UNKNOWN,
                    id: day.pm.id,
                    date: dateStr,
                    vacationDay: VacationDay.AFTERNOON
                });
            }
        }
        return vacationDtoList;
    }

}
