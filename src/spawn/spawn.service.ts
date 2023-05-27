import { CreepRoles } from "creep/roles/types";

export const getOpenSpawn = (room: Room): StructureSpawn | undefined => {
  const openSpawns = Object.values(Game.spawns).filter(spawn => spawn.room.name === room.name && !spawn.spawning);
  if(openSpawns.length === 0) return undefined;
  return openSpawns[0];
}

export const getCreepRoleToSpawn = (): CreepRoles => {
  return "bootstrapper";
}
