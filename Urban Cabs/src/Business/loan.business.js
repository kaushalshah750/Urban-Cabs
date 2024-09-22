import db from '../config/db';

async function getLoanById(loan_id){
    try{
        var [loans] = await db.query(`
            SELECT Loan_id, Cab_id as Cab, Bank_id as Bank, Amount, Disbursed_amount, Interest_rate, Monthly_emi, Tenure, EMI_paid, Borrowed_by, Status, Start_date, End_date FROM Loans WHERE Loan_id = ?
        `, [loan_id])
        console.log(loans)
        var loan = loans[0]
        var [cab] = await db.query(`
            SELECT c.Cab_id, comp.Company, m.Model, c.Amount, c.Fuel, c.Number_plate, c.Ownership, c.Purchased_on, c.Added_on FROM Cabs as c
            LEFT JOIN Cab_Company comp on comp.Company_id = c.Company_id
            LEFT JOIN Cab_Model m on m.Model_id = c.Model_id
            WHERE c.Cab_id = ?
        `, [loan.Cab])

        var [owner] = await db.query(`SELECT User_id, Name, Email, Phone FROM Users WHERE User_id = ?`, [cab[0].Ownership])
        
        var [bank] = await db.query("SELECT * FROM Banks WHERE Bank_id = ?", [loan.Bank])

        var [borrowed_by] = await db.query(`SELECT User_id, Name, Email, Phone FROM Users WHERE User_id = ?`, [loan.Borrowed_by])


        loan.Bank = bank[0]
        loan.Cab = cab[0]
        loan.Cab.Ownership = owner[0]
        loan.Borrowed_by = borrowed_by[0]
        return loan;
    } catch (error){
        console.log(error)
        return false;
    }
}

async function getLoanList(){
    try{
        var [loans] = await db.query(`
            SELECT Loan_id, Cab_id as Cab, Bank_id as Bank, Amount, Disbursed_amount, Interest_rate, Monthly_emi, Tenure, EMI_paid, Borrowed_by, Status, Start_date, End_date FROM Loans
        `)
        for (var loan of loans) {
            var [cab] = await db.query(`
                SELECT c.Cab_id, comp.Company, m.Model, c.Amount, c.Fuel, c.Number_plate, c.Ownership, c.Purchased_on, c.Added_on FROM Cabs as c
                LEFT JOIN Cab_Company comp on comp.Company_id = c.Company_id
                LEFT JOIN Cab_Model m on m.Model_id = c.Model_id
                WHERE c.Cab_id = ?
            `, [loan.Cab])

            var [owner] = await db.query(`SELECT User_id, Name, Email, Phone FROM Users WHERE User_id = ?`, [cab[0].Ownership])
            
            var [bank] = await db.query("SELECT * FROM Banks WHERE Bank_id = ?", [loan.Bank])

            var [borrowed_by] = await db.query(`SELECT User_id, Name, Email, Phone FROM Users WHERE User_id = ?`, [loan.Borrowed_by])


            loan.Bank = bank[0]
            loan.Cab = cab[0]
            loan.Cab.Ownership = owner[0]
            loan.Borrowed_by = borrowed_by[0]
        }
        return loans;
    } catch (error){
        console.log(error)
        return false;
    }
}

async function editLoan(loan){
    console.log(loan)
    try{
        db.query(`
        UPDATE Loans 
        SET Cab_id = ?, Bank_id = ?, Amount = ?, Disbursed_amount = ?, Interest_rate = ?, Monthly_emi = ?, Tenure = ?, Borrowed_by = ?, Status = ?, Start_date = ?, End_date = ?
        WHERE Loan_id = ?
        `, [loan.Cab_id, loan.Bank_id, loan.Amount, Number(loan.Disbursed_amount), loan.Interest_rate, loan.Monthly_emi, loan.Tenure, loan.Borrowed_by, loan.Status, new Date(loan.Start_date), new Date(loan.End_date), loan.Loan_id])
        
        return true;
    } catch (error){
        console.log(error)
        return false;
    }
}

async function addNewLoan(loan){
    console.log(loan)
    try{
        db.query(`
            INSERT INTO Loans ( Cab_id, Bank_id, Amount, Disbursed_amount, Interest_rate, Monthly_emi, Tenure, EMI_paid, Borrowed_by, Status, Start_date, End_date )
            VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? );
        `, [loan.Cab_id, loan.Bank_id, loan.Amount, loan.Disbursed_amount, loan.Interest_rate, loan.Monthly_emi, loan.Tenure, 0, loan.Borrowed_by, loan.Status, new Date(loan.Start_date), new Date(loan.End_date)])

        return true;
    } catch (error){
        console.log(error)
        return false;
    }
}

async function getBankList(){
    try{
        var [banks] = await db.query("SELECT Bank_id, Name, Branch, Account_number, Ifsc_code FROM Banks;")
        console.log(banks)
        return banks;
    } catch (error){
        console.log(error)
        return false;
    }
}

async function getMonthlyEMI(){
    try{
        var [Monthly_emi] = await db.query("SELECT SUM(Monthly_emi) as 'Monthly_emi' FROM Loans")
        return Monthly_emi[0];
    } catch (error){
        console.log(error)
        return false;
    }
}

async function removeLoan(Loan_id){
    try{
        await db.query(`
            DELETE FROM Loans
            WHERE Loan_id = ?
        `, [Loan_id])
        return true;
    } catch (error){
        console.log(error)
        return false;
    }
}

module.exports = { getLoanById, getLoanList, addNewLoan, getBankList, editLoan, getMonthlyEMI, removeLoan }