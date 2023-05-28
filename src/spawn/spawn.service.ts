import { CreepRoles } from "creep/roles/types";

export const getOpenSpawn = (room: Room): StructureSpawn | undefined => {
  const openSpawns = Object.values(Game.spawns).filter(spawn => spawn.room.name === room.name && !spawn.spawning);
  if(openSpawns.length === 0) return undefined;
  return openSpawns[0];
}

export const getCreepRoleToSpawn = (): CreepRoles | null => {
  if (Object.values(Game.creeps).length === 0) return CreepRoles.Bootstrapper;

  const miners = Object.values(Game.creeps).filter(creep => creep.memory.role === CreepRoles.Miner);
  if(miners.length < 2) return CreepRoles.Miner;

  const carriers = Object.values(Game.creeps).filter(creep => creep.memory.role === CreepRoles.Carrier);
  if(carriers.length < 2) return CreepRoles.Carrier;

  return null;
}
