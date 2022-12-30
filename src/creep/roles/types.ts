export interface ICreepRole {
  runCreep: (creep: Creep) => void;
}

export type CreepRoles = "harvester" | "miner" | "worker";
