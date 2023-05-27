import { getOwnedRooms } from "memory/empire/memory.empire.service";
import { getOpenSpawn, getCreepRoleToSpawn } from "./spawn.service";
import { getRequiredEnergyForSpawn } from "creep/creep.helpers";

export const runSpawns = () => {
  const ownedRooms = getOwnedRooms();
  for(const room of ownedRooms) {
    runSpawnsForRoom(room);
  }
}

const runSpawnsForRoom = (room: Room) => {
  const openSpawn = getOpenSpawn(room);
  if (!openSpawn) return;

  const creepRoleToSpawn = getCreepRoleToSpawn();
  const creepBody = [WORK, CARRY, MOVE];
  const creepName = `creep-${creepRoleToSpawn}-${Game.time}`;
  const creepOptions = {
    memory: {
      role: creepRoleToSpawn, room: room.name, working: false
    }
  };

  const requiredEnergy = getRequiredEnergyForSpawn(creepBody);
  if (openSpawn.room.energyAvailable < requiredEnergy) return;

  openSpawn.spawnCreep(
    creepBody,
    creepName,
    creepOptions,
  );
}
