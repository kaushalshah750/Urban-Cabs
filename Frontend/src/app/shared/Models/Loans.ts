import { Banks } from "./Banks";
import { Cabs } from "./Cabs";
import { UserDetail } from "./UserDetail";

export interface LoansResponse{
    err: boolean;
    errMessage: string;
    data: Loans[]
}

export interface LoanResponse{
    err: boolean;
    errMessage: string;
    data: Loans
}

export interface RemoveLoanResponse{
    err: boolean;
    errMessage: string;
    data: boolean
}

export interface Loans{
    Loan_id: number
    Cab: Cabs
    Bank: Banks
    Amount: number
    Disbursed_amount: number
    Interest_rate: number
    Monthly_emi: number
    Tenure: number
    EMI_paid: number
    Borrowed_by: UserDetail
    Status: string
    Start_date: Date
    End_date: Date
}