import axios, { AxiosResponse } from "axios";
import { ILoginResponse } from "../types/loginResponse";
import { IPass, IPassDto } from "../types/pass";
import $api from "../http";
export default class MyService {
    static async Login(userName: string, password: string): Promise<ILoginResponse | string> {
        try {
            const response: AxiosResponse<ILoginResponse> = await $api.get<ILoginResponse>(
                `/auth/login?Username=${userName}&Password=${password}`
            );
            console.log(response);
            return response.data as ILoginResponse;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return Promise.reject(error);
            } else {
                return Promise.reject(new Error(String(error)));
            }
        }
    }
    static async LogOut(): Promise<void> {
        try {
            const response = await $api.post("auth/logOut");
            if (response.data.redirectUrl) {
                localStorage.removeItem('accessToken');
                window.location.href = response.data.redirectUrl;
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return Promise.reject(error);
            } else {
                return Promise.reject(new Error(String(error)));
            }
        }
    }
    static async GetPasses(): Promise<IPass[]> {
        try {
            const response: AxiosResponse<IPass[]> = await $api.get<IPass[]>("/pass/getPasses");
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return Promise.reject(error);
            } else {
                return Promise.reject(new Error(String(error)));
            }
        }
    }
    static async GetPass(passId: string): Promise<IPass> {
        try {
            const response = await $api.get(
                `/pass/getPass/${passId}`
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return Promise.reject(error);
            } else {
                return Promise.reject(new Error(String(error)));
            }
        }
    }
    static async PostPass(formData: IPassDto): Promise<IPass> {
        try {
            const response: AxiosResponse<IPass> = await $api.post<IPass>(
                "/pass/postPass",
                { ...formData }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return Promise.reject(error);
            } else {
                return Promise.reject(new Error(String(error)));
            }
        }
    }
    static async UpdatePass(pass: IPass): Promise<IPass> {
        try {
            const response: AxiosResponse<IPass> = await $api.put<IPass>(
                `/pass/updatePass`, pass);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return Promise.reject(error);
            } else {
                return Promise.reject(new Error(String(error)));

            }
        }
    }
}