import { getOwnedRooms } from "memory/empire/memory.empire.service";
import { getOpenSpawn, getCreepRoleToSpawn } from "./spawn.service";
import { getRequiredEnergyForSpawn } from "creep/creep.helpers";
import { getRoleStrategy } from "creep/types";

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
  const roleStrategy = getRoleStrategy(creepRoleToSpawn);

  const creepBody = roleStrategy.getBody();
  const creepOptions = roleStrategy.getOptions(room.name);
  const creepName = `creep-${creepRoleToSpawn}-${Game.time}`;

  const requiredEnergy = getRequiredEnergyForSpawn(creepBody);
  if (openSpawn.room.energyAvailable < requiredEnergy) return;

  openSpawn.spawnCreep(
    creepBody,
    creepName,
    creepOptions,
  );
}
