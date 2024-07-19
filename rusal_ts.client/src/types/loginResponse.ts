import { AxiosRequestConfig } from "axios";

export interface ILoginResponse {
    userId: string;
    userName: string;
    accessToken: string
}
export interface AxiosResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: AxiosRequestConfig;
    request?: any;
}