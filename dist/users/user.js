"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const db_1 = require("./db");
const registerUser = (username, password) => {
    const existingUser = (0, db_1.findUserByUsername)(username);
    if (existingUser) {
        return {
            status: 'error',
            message: 'User already exists.',
        };
    }
    const newUser = (0, db_1.addUser)(username, password);
    return {
        status: 'success',
        message: 'User registered successfully.',
        userId: newUser.id,
    };
};
exports.registerUser = registerUser;
const loginUser = (username, password) => {
    const user = (0, db_1.findUserByUsername)(username);
    if (!user) {
        return {
            status: 'error',
            message: 'User not found.',
        };
    }
    if (user.password !== password) {
        return {
            status: 'error',
            message: 'Invalid password.',
        };
    }
    return {
        status: 'success',
        message: 'Login successful.',
        userId: user.id,
    };
};
exports.loginUser = loginUser;
