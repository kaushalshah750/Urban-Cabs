import express from 'express';
var router = express.Router();
import users from './user.controller'

module.exports = () => {
    router.post("/create", users.createUser);
    return router;
}