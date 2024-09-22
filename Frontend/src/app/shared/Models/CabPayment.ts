import { UserDetail } from "./UserDetail";

export interface CabPaymentResponse{
    err: boolean;
    errMessage: string;
    data: CabPayment[]
}

export interface AddCabPaymentResponse{
    err: boolean;
    errMessage: string;
    data: boolean
}

export interface CabPayment{
    Payment_id: number,
    User: UserDetail,
    Amount: number,
    Remark: string,
    Paid_on: Date,
}

export interface AddEditCabPayment{
    Payment_id: number,
    Cab_id: number,
    User_id: number,
    Amount: number,
    Remark: string,
    Paid_on: Date,
}