import db from '../config/db';

async function getBalance(){
    try{
        var [income] = await db.query(`
            Select SUM(Amount) as Balance from Income;
        `)

        var [expense] = await db.query(`
            Select SUM(Amount) as Balance from Expense;
        `)
        
        var balance = income[0].Balance - expense[0].Balance

        return balance;
    } catch (error){
        console.log(error)
        return false;
    }
}

async function getIncomeList(){
    try{
        var [income] = await db.query(`
            SELECT Id, Reason, Amount, Income_Date FROM Income;
        `)
        return income;
    } catch (error){
        console.log(error)
        return false;
    }
}

async function editIncome(editIncome){
    try{
        await db.query(`
            UPDATE Income 
            SET Reason = ?, Amount = ?, Income_Date = ?, Last_Updated = ?
            WHERE Id = ?
        `, [editIncome.Reason, editIncome.Amount, new Date(editIncome.Income_Date), new Date(), editIncome.Id])

        return true;
    } catch (error){
        console.log(error)
        return false;
    }
}

async function deleteIncome(id){
    try{
        await db.query(`
            Delete from Income 
            WHERE Id = ?
        `, [ id ])

        return true;
    } catch (error){
        console.log(error)
        return false;
    }
}

async function addNewIncome(income){
    console.log(income)
    try{
        db.query(`
            INSERT INTO Income (Reason, Amount, Income_Date, Added_on, Last_Updated)
            VALUES ( ?, ?, ?, ?, ? );
        `, [income.Reason, income.Amount, income.Income_Date, new Date(), new Date()])
        return true;
    } catch (error){
        console.log(error)
        return false;
    }
}

module.exports = { getIncomeList, addNewIncome, getBalance, editIncome, deleteIncome }