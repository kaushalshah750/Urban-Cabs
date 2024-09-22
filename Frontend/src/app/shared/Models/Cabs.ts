import { Company } from "./Company";
import { Model } from "./Model";
import { UserDetail } from "./UserDetail";

export interface CabsResponse{
    err: boolean;
    errMessage: string;
    data: Cabs[]
}

export interface CabResponse{
    err: boolean;
    errMessage: string;
    data: Cabs
}

export interface Cabs{
    Cab_id: number;
    Company: Company;
    Model: Model;
    Amount: number
    Fuel: string;
    Number_plate: string;
    Ownership: UserDetail;
    Partners: UserDetail[];
    Status: string;
    Purchased_on: Date;
    Delievery_on: Date;
    Added_on: Date;
}