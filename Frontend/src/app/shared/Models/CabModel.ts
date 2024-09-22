export interface CabModelResponse{
    err: boolean;
    errMessage: string;
    data: CabModel[]
}

export interface CabModel{
    Model_id: number;
    Model: string
}