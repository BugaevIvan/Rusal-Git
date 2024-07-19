import { EPassStatus } from "./pass";

export interface IFilter {
    passIdOrNumber: string;
    datefrom: string;
    dateto: string;
    status: EPassStatus;
}
