export interface IncomesResponse{
    err: boolean;
    errMessage: string;
    data: Income[]
}

export interface AddEditIncomeResponse{
    err: boolean;
    errMessage: string;
    data: boolean
}

export interface Income{
    Id: number
    Reason: string
    Amount: number
    Income_Date: Date
    Added_on: Date
}