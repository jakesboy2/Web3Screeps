import { getOpenSpawn, getCreepRoleToSpawn } from "./spawn.service";
import { getRequiredEnergyForSpawn } from "spawn/spawn.helper";
import { getRoleStrategy } from "creep/types";

export const runSpawnsForRoom = (room: Room) => {
  const openSpawn = getOpenSpawn(room);
  if (!openSpawn) return;

  const creepRoleToSpawn = getCreepRoleToSpawn();
  if (!creepRoleToSpawn) return;
  const roleStrategy = getRoleStrategy(creepRoleToSpawn);

  const creepBody = roleStrategy.getBody();
  const creepOptions = roleStrategy.getOptions(room.name);
  const creepName = `${creepRoleToSpawn}-${Game.time}`;

  const requiredEnergy = getRequiredEnergyForSpawn(creepBody);
  if (openSpawn.room.energyAvailable < requiredEnergy) return;

  openSpawn.spawnCreep(
    creepBody,
    creepName,
    creepOptions,
  );
}
