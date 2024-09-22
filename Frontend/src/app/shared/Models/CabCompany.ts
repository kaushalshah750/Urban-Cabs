export interface CabCompanyResponse{
    err: boolean;
    errMessage: string;
    data: CabCompany[]
}

export interface CabCompany{
    Company_id: number;
    Company: string
}