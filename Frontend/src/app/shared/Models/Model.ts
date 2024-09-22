export interface ModelResponse {
    err: boolean;
    errMessage: string;
    data: Model[]
}

export interface Model {
    Model_id: number;
    Model: string;
}