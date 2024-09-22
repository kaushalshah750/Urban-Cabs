export interface AddLoan {
    Cab_id: number
    Bank_id: number
    Amount: number
    Disbursed_amount: number
    Interest_rate: number
    Monthly_emi: number
    Tenure: number
    Borrowed_by: number
    Status: string
    Start_date: Date
    End_date: Date
}

export interface EditLoan {
    Loan_id: number
    Cab_id: number
    Bank_id: number
    Amount: number
    Disbursed_amount: number
    Interest_rate: number
    Monthly_emi: number
    Tenure: number
    Borrowed_by: number
    Status: string
    Start_date: Date
    End_date: Date
}

export interface AddLoanResponse{
    err: boolean;
    errMessage: string;
    data: boolean
}
