import db from '../config/db';

async function addNewCab(cab){
    try{
        
        var [newCab] = await db.query(`
            INSERT INTO Cabs ( Company_id, Model_id, Amount, Fuel, Number_plate, Ownership, Status, Purchased_on, Delievery_on, Added_on )
            VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )
        `, [cab.Company_id, cab.Model_id, cab.Amount, cab.Fuel, cab.Number_plate, cab.Ownership, cab.Status, new Date(cab.Purchased_on), new Date(cab.Delievery_on), new Date()])
        
        for (var partner of cab.Partners) {
            await db.query(`
                INSERT INTO Cab_Partner ( Cab_id, User_id, Added_on )
                VALUES ( ?, ?, ? );
            `, [newCab.insertId, partner.User_id, new Date()])
        }
        return true;
    } catch (error){
        console.log(error)
        return false;
    }
}

async function addCabPayment(cabPayment){
    try{
        await db.query(`
            INSERT INTO Cab_Payment ( Cab_id, User_id, Amount, Remark, Paid_on )
            VALUES ( ?, ?, ?, ?, ? );
        `, [cabPayment.Cab_id, cabPayment.User_id, cabPayment.Amount, cabPayment.Remark, new Date(cabPayment.Paid_on)])
        
        return true;
    } catch (error){
        console.log(error)
        return false;
    }
}

async function editCabPayment(cabPayment){
    try{
        await db.query(`
            UPDATE Cab_Payment 
            SET User_id = ?, Amount = ?, Remark = ?, Paid_on = ?
            WHERE Payment_id = ?
        `, [cabPayment.User_id, cabPayment.Amount, cabPayment.Remark, new Date(cabPayment.Paid_on), cabPayment.Payment_id])

        return true;
    } catch (error){
        console.log(error)
        return false;
    }
}

async function deleteCabPayment(Payment_id){
    try{
        await db.query(`
            DELETE FROM Cab_Payment 
            WHERE Payment_id = ?
        `, [Payment_id])

        return true;
    } catch (error){
        console.log(error)
        return false;
    }
}

async function editCab(cab){
    try{
        db.query(`
            UPDATE Cabs 
            SET Company_id = ?, Model_id = ?, Amount = ?, Fuel = ?, Number_plate = ?, Ownership = ?, Status = ?, Purchased_on = ?, Delievery_on = ?
            WHERE Cab_id = ?
        `, [cab.Company_id, cab.Model_id, cab.Amount, cab.Fuel, cab.Number_plate, cab.Ownership, cab.Status, new Date(cab.Purchased_on), new Date(cab.Delievery_on), cab.Cab_id])

        return true;
    } catch (error){
        console.log(error)
        return false;
    }
}

async function getCabList(){
    try{
        var [cabs] = await db.query(`
            SELECT Cab_id, Company_id as Company, Model_id as Model, Amount, Fuel, Number_plate, Ownership, Purchased_on, Delievery_on, Status, Added_on FROM Cabs;
        `)
        for (var cab of cabs) {
            var [company] = await db.query(`SELECT * FROM Cab_Company WHERE Company_id = ?`, [cab.Company])
            var [model] = await db.query(`SELECT Model_id, Model FROM Cab_Model WHERE Model_id = ?`, [cab.Model])
            var [owner] = await db.query(`SELECT User_id, Name, Email, Phone FROM Users WHERE User_id = ?`, [cab.Ownership])
            var [partners] = await db.query(`
                SELECT u.User_id, u.Name, u.Email, u.Phone FROM Users u
                LEFT JOIN Cab_Partner cp on cp.User_id = u.User_id
                WHERE cp.Cab_id = ?
            `, [cab.Cab_id])
            cab.Ownership = owner[0]
            cab['Partners'] = partners
            cab['Company'] = company[0]
            cab['Model'] = model[0]
        }
        return cabs;
    } catch (error){
        console.log(error)
        return false;
    }
}

async function getCabById(Cab_id){
    try{
        var [cabs] = await db.query(`
            SELECT Cab_id, Company_id as Company, Model_id as Model, Amount, Fuel, Number_plate, Ownership, Purchased_on, Delievery_on, Status, Added_on FROM Cabs WHERE Cab_id = ?;
        `, [Cab_id])
        var cab = cabs[0]

        var [company] = await db.query(`SELECT * FROM Cab_Company WHERE Company_id = ?`, [cab.Company])
        var [model] = await db.query(`SELECT Model_id, Model FROM Cab_Model WHERE Model_id = ?`, [cab.Model])
        var [owner] = await db.query(`SELECT User_id, Name, Email, Phone FROM Users WHERE User_id = ?`, [cab.Ownership])
        var [partners] = await db.query(`
            SELECT u.User_id, u.Name, u.Email, u.Phone FROM Users u
            LEFT JOIN Cab_Partner cp on cp.User_id = u.User_id
            WHERE cp.Cab_id = ?
        `, [cab.Cab_id])
        cab.Ownership = owner[0]
        cab['Partners'] = partners
        cab['Company'] = company[0]
        cab['Model'] = model[0]

        return cab;
    } catch (error){
        console.log(error)
        return false;
    }
}

async function getCabCompany(){
    try{
        var [cabCompany] = await db.query("SELECT * FROM Cab_Company;")
        return cabCompany;
    } catch (error){
        console.log(error)
        return false;
    }
}

async function getCabPayment(cab_id){
    try{
        var [cabPayments] = await db.query("SELECT Payment_id, User_id as User, Amount, Remark, Paid_on FROM Cab_Payment WHERE Cab_id = ?;", [cab_id])

        for (var cabPayment of cabPayments) {
            var [user] = await db.query(`SELECT User_id, Name, Email, Phone FROM Users WHERE User_id = ?`, [cabPayment.User])
            cabPayment.User = user[0]
        }

        return cabPayments;
    } catch (error){
        console.log(error)
        return false;
    }
}

async function getCabModel(company){
    try{
        var [cabModel] = await db.query("SELECT * FROM Cab_Model WHERE Company_id = ?;", [company])
        return cabModel;
    } catch (error){
        console.log(error)
        return false;
    }
}

module.exports = { addNewCab, addCabPayment, editCabPayment, deleteCabPayment, editCab, getCabList, getCabById, getCabCompany, getCabPayment, getCabModel }