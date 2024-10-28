interface User {
    id: string;
    username: string;
    password: string;
  }

  const users: User[] = [];

  export const addUser = (username: string, password: string): User => {
    const newUser: User = {
      id: (users.length + 1).toString(),
      username,
      password,
    };
    users.push(newUser);
    return newUser;
  };

  export const findUserByUsername = (username: string): User | undefined => {
    return users.find(user => user.username === username);
  };

  export const getAllUsers = (): User[] => {
    return users;
  };
