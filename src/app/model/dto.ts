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
    id: number;
    date: Date;
    vacationType?: VacationType;
    vacationDay: VacationDay;
}

export enum Role {
  ROLE_USER = 'ROLE_USER',
  ROLE_VALIDEUR = 'ROLE_VALIDEUR',
  ROLE_ADMIN = 'ROLE_ADMIN'
}

export class ValidateVacDto {
  mailto: string;
  mailfrom: string;
  message: string;
}

export class AskResultDto {
  mailfrom: string;
  mailto: string;
  ccList: string[] | undefined;
  message: string;
  vacationList: VacationDto[];
}

export class VacationSummary {
  countStandard: number;
  countRtt: number;
  userId:number;
}

export enum EnumValideur {
  NONE = "NONE",
  PRINCIPAL = "PRINCIPAL",
  SECONDARY = "SECONDARY"
}
