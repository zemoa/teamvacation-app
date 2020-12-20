export enum VacationType{
    UNKNOWN="UNKNOWN",
    Standard="Standard",
    RTT="RTT",
}

export enum VacationDay{
    UNKNOWN="UNKNOWN",
    ALL="ALL",
    MORNING="MORNING",
    AFTERNOON="AFTERNOON",
}

export class VacationDto {
    id: number;
    date: string;
    validated: boolean;
    type?: VacationType;
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

export class Empty {}
