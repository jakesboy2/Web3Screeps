import { getOwnedRooms } from "memory/empire/memory.empire.service";
import { runSpawnsForRoom } from "spawn/spawn.manager";

export const runRooms = () => {
  const ownedRooms = getOwnedRooms();
  for (const room of ownedRooms) {
    runRoom(room);
  }
};

const runRoom = (room: Room) => {
  runSpawnsForRoom(room);
}
