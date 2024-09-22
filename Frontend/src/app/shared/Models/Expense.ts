export interface ExpensesResponse{
    err: boolean;
    errMessage: string;
    data: Expense[]
}

export interface AddEditExpenseResponse{
    err: boolean;
    errMessage: string;
    data: boolean
}

export interface Expense{
    Id: number
    Reason: string
    Amount: number
    Expense_Date: Date
    Added_on: Date
}