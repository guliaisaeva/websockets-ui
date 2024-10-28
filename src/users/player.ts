interface Player {
  name: string;
  password: string;
  index: number | string;
}

const playersDB: Player[] = [];

export const registerPlayer = (name: string, password: string) => {
  const existingPlayer = playersDB.find(player => player.name === name);

  if (existingPlayer) {
    return {
      type: "reg",
      data: {
        name,
        index: existingPlayer.index,
        error: true,
        errorText: "Player already exists.",
      },
      id: 0,
    };
  }

  const newIndex = playersDB.length + 1;
  const newPlayer: Player = {
    name,
    password,
    index: newIndex,
  };

  playersDB.push(newPlayer);

  return {
    type: "reg",
    data: {
      name: newPlayer.name,
      index: newPlayer.index,
      error: false,
      errorText: "",
    },
    id: 0,
  };
};
