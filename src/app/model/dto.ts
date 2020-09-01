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

export enum Role {
  ROLE_USER = 'ROLE_USER',
  ROLE_VALIDEUR = 'ROLE_VALIDEUR',
  ROLE_ADMIN = 'ROLE_ADMIN'
}


