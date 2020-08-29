export enum VacationType{
    UNKNOWN,
    Standard,
    RTT,
}

export enum VacationDay{
    UNKNOWN,
    ALL,
    MORNING,
    AFTERNOON,
}

export class VacationDto {
    date: Date;
    vacationType?: VacationType;
    vacationDay: VacationDay;
}


