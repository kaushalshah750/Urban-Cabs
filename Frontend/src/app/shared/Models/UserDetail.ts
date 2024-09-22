export interface UserDetailResponse{
    err: boolean;
    errMessage: string;
    data: UserDetail[]
}

export interface UserDetail{
    User_id: number;
    Name: string;
    Email: string;
    Phone: string;
}