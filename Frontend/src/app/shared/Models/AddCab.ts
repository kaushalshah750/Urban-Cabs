import { UserDetail } from "./UserDetail"

export interface AddCabResponse{
    err: boolean;
    errMessage: string;
    data: boolean
}

export interface AddCab {
    Company_id: number
    Model_id: number
    Number_plate: string
    Amount: number
    Fuel: string
    Ownership: number
    Partners: UserDetail[]
    Status: string
    Purchased_on: Date
    Delievery_on: Date
}

export interface EditCab {
    Cab_id: number
    Company_id: number
    Model_id: number
    Number_plate: string
    Amount: number
    Fuel: string
    Ownership: number
    Partners: UserDetail[]
    Status: string
    Purchased_on: Date
    Delievery_on: Date
}
