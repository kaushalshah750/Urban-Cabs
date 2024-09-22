export interface CompanyResponse {
    err: boolean;
    errMessage: string;
    data: Company[]
}

export interface Company {
    Company_id: number;
    Company: string;
}