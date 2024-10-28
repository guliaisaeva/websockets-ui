"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.findUserByUsername = exports.addUser = void 0;
const users = [];
const addUser = (username, password) => {
    const newUser = {
        id: (users.length + 1).toString(),
        username,
        password,
    };
    users.push(newUser);
    return newUser;
};
exports.addUser = addUser;
const findUserByUsername = (username) => {
    return users.find(user => user.username === username);
};
exports.findUserByUsername = findUserByUsername;
const getAllUsers = () => {
    return users;
};
exports.getAllUsers = getAllUsers;
