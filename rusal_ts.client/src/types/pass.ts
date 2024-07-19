export enum EPassStatus {
    VALID_PASS = "Действителен",
    PAUSEd_PASS = "Приостановлен",
    EXPIRED_PASS = "Просрочен",
    CONFISCATED_PASS = "Изъят",
    UNDEFINED = "Неизвестно"
}

export enum EPassType {
    PERMANENT_PASS = "Постоянный",
    TEMPORARY_PASS = "Временный",
    ONETIME_PASS = "Разовый",
    UNDEFINED = "Неизвестно"
}

export enum EPassTypePeriod {
    PERMANENT_PASS = "Постоянный",
    TEMPORARY_PASS = "Временный",
    ONETIME_PASS = "Разовый",
    UNDEFINED = "Неизвестно"
}

export interface IPass {
    passId: string,
    dateApply: string,
    number: string,
    status: EPassStatus,
    type: EPassType,
    typePeriod: EPassTypePeriod,
    organization: string,
    comment: string,
    datefrom: string,
    dateto: string,
}
export interface IPassDto {
    passId?: string
    status: EPassStatus,
    type: EPassType,
    typePeriod: EPassTypePeriod,
    organization: string,
    comment: string,
    datefrom: string,
    dateto: string,
}