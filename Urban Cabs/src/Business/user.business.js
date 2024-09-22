import db from '../config/db';

async function getAllUser(){
    var [users] = await db.query(`SELECT User_id, Name, Email, Phone FROM Users`)
    return users;
}

module.exports = { getAllUser }