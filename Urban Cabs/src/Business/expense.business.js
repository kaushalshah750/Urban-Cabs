import db from '../config/db';

async function getExpenseList(){
    try{
        var [Expense] = await db.query(`
            SELECT Id, Reason, Amount, Expense_Date FROM Expense;
        `)
        return Expense;
    } catch (error){
        console.log(error)
        return false;
    }
}

async function addNewExpense(Expense){
    console.log(Expense)
    try{
        db.query(`
            INSERT INTO Expense (Reason, Amount, Expense_Date, Added_on, Last_Updated)
            VALUES ( ?, ?, ?, ?, ? );
        `, [Expense.Reason, Expense.Amount, Expense.Expense_Date, new Date(), new Date()])
        return true;
    } catch (error){
        console.log(error)
        return false;
    }
}


async function editExpense(editExpense){
    try{
        await db.query(`
            UPDATE Expense 
            SET Reason = ?, Amount = ?, Expense_Date = ?, Last_Updated = ?
            WHERE Id = ?
        `, [editExpense.Reason, editExpense.Amount, new Date(editExpense.Expense_Date), new Date(), editExpense.Id])

        return true;
    } catch (error){
        console.log(error)
        return false;
    }
}

async function deleteExpense(id){
    try{
        await db.query(`
            Delete from Expense 
            WHERE Id = ?
        `, [ id ])

        return true;
    } catch (error){
        console.log(error)
        return false;
    }
}

module.exports = { getExpenseList, addNewExpense, editExpense, deleteExpense }