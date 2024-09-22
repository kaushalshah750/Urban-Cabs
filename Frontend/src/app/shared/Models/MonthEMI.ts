export interface MonthEMIResponse{
    err: boolean;
    errMessage: string;
    data: MonthEMI
}

export interface MonthEMI{
    Monthly_emi: number;
}