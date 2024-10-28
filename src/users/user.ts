import { addUser, findUserByUsername } from './db';
import { RegistrationResponse, LoginResponse } from '../types/types';

export const registerUser = (
  username: string,
  password: string,
): RegistrationResponse => {
  const existingUser = findUserByUsername(username);

  if (existingUser) {
    return {
      status: 'error',
      message: 'User already exists.',
    };
  }

  const newUser = addUser(username, password);
  return {
    status: 'success',
    message: 'User registered successfully.',
    userId: newUser.id,
  };
};

export const loginUser = (
  username: string,
  password: string,
): LoginResponse => {
  const user = findUserByUsername(username);

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
