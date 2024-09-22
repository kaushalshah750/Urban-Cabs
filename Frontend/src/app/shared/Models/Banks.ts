import { UserDetail } from "./UserDetail";

export interface BanksResponse{
    err: boolean;
    errMessage: string;
    data: Banks[]
}

export interface Banks{
    Bank_id: number;
    Name: string;
    Branch: string;
    Account_number: number
    Ifsc_code: string;
}